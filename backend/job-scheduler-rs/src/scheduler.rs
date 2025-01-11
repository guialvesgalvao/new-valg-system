use anyhow::{anyhow, Result};
use async_trait::async_trait;
use chrono::{Datelike, Utc};
use cron::Schedule;
use std::str::FromStr;
use tokio::time::sleep;

use crate::{
    config::{database::get_database_pool, environment::Config, scheduler::SchedulerConfig},
    models::{
        bill_model::CreateBill, bill_recurrence_model::RecurrenceModel, bill_status::BillStatus,
    },
    repositories::{bill_repository::BillRepository, recurrence_repository::RecurrencesRepository},
    services::{bill_service::BillService, recurrence_service::RecurrencesService},
};

#[async_trait]
pub trait Scheduler {
    async fn start_scheduler(&self) -> Result<()>;
}

#[derive(Clone)]
pub struct RecurrenceScheduler {
    config: Config,
    pub scheduler_config: SchedulerConfig,
}

impl RecurrenceScheduler {
    pub fn new(config: Config, scheduler_config: SchedulerConfig) -> Self {
        Self {
            config,
            scheduler_config,
        }
    }

    pub async fn run(&self) -> Result<()> {
        tracing::info!("Scheduler started!");

        let schedule = Schedule::from_str(&self.scheduler_config.cron_expression).map_err(|e| {
            anyhow!(
                "Invalid cron expression ({}): {:?}",
                self.scheduler_config.cron_expression,
                e
            )
        })?;

        loop {
            let now = Utc::now();
            let next_run = schedule
                .upcoming(Utc)
                .next()
                .ok_or_else(|| anyhow!("No upcoming run found in cron schedule"))?;

            let duration = (next_run - now).to_std()?;
            tracing::info!("Sleeping until the next run at: {}", next_run);
            sleep(duration).await;

            if let Err(err) = self.check_and_create_bills().await {
                tracing::error!("Error in check_and_create_bills: {:?}", err);
            }
        }
    }

    async fn check_and_create_bills(&self) -> Result<()> {
        tracing::info!("Checking and creating bills...");

        let db_pool = get_database_pool(&self.config).await?;

        let recurrences_repository = RecurrencesRepository::new(db_pool.clone());
        let bill_repository = BillRepository::new(db_pool.clone());

        let recurrences_service = RecurrencesService::new(recurrences_repository);
        let bill_service = BillService::new(bill_repository);

        let recurrences = recurrences_service
            .get_active_recurrences()
            .await
            .map_err(|e| anyhow!("Error while getting active recurrences: {}", e))?;

        tracing::info!("Found {} active recurrences", recurrences.len());

        // Processa cada recorrência em paralelo para ganhar desempenho
        let mut tasks = vec![];
        for recurrence in recurrences {
            let bill_service_clone = bill_service.clone();
            let handle = tokio::spawn(async move {
                if let Err(err) = process_recurrence(bill_service_clone, recurrence).await {
                    tracing::error!("Error processing recurrence: {:?}", err);
                }
            });

            tasks.push(handle);
        }

        futures::future::join_all(tasks).await;

        db_pool.close().await;

        tracing::info!("Finished checking and creating bills...");
        Ok(())
    }
}

#[async_trait]
impl Scheduler for RecurrenceScheduler {
    async fn start_scheduler(&self) -> Result<()> {
        self.run().await
    }
}

async fn process_recurrence(bill_service: BillService, recurrence: RecurrenceModel) -> Result<()> {
    let now = Utc::now();
    let due_date =
        chrono::NaiveDate::from_ymd_opt(now.year(), now.month(), recurrence.day_of_due as u32)
            .ok_or_else(|| anyhow!("Invalid date for day_of_due: {}", recurrence.day_of_due))?;

    let existing_bill = bill_service
        .get_by_name_and_due_date(&recurrence.name, recurrence.user_id, &due_date)
        .await?;

    match existing_bill {
        Some(bill) => {
            tracing::warn!(
                "Bill already exists for recurrence: {}, bill id: {}",
                recurrence.name,
                bill.id
            );
        }
        None => {
            let bill = CreateBill {
                name: recurrence.name.clone(),
                amount: recurrence.average_amount,
                status: BillStatus::Pending,
                user_id: recurrence.user_id.clone(),
                is_generated_by_recurrence: true,
                due_date,
            };

            let bill_id = bill_service.create_bill(bill).await?;
            tracing::info!("Bill created with id: {}", bill_id);
        }
    }

    Ok(())
}
