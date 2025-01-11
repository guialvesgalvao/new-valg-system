use async_trait::async_trait;

use chrono::{Datelike, NaiveDate, Utc};
use cron::Schedule;

use std::str::FromStr;

use tokio::time::sleep;

use crate::{
    config::{database::get_database_pool, environment::Config, scheduler::SchedulerConfig},
    models::bill_model::CreateBill,
    repositories::{bill_repository::BillRepository, recurrence_repository::RecurrencesRepository},
    services::{bill_service::BillService, recurrence_service::RecurrencesService},
};

#[async_trait]
pub trait Scheduler {
    async fn start_scheduler(&self, config: SchedulerConfig);
}

pub struct RecurrenceScheduler {
    config: Config,
}

impl RecurrenceScheduler {
    pub fn new(config: Config) -> Self {
        RecurrenceScheduler { config }
    }
}

#[async_trait]
impl Scheduler for RecurrenceScheduler {
    async fn start_scheduler(&self, scheduler_config: SchedulerConfig) {
        tracing::info!("Scheduler started!");

        let schedule = Schedule::from_str(&scheduler_config.cron_expression).unwrap();

        loop {
            let now = Utc::now();
            let next_run = schedule.upcoming(Utc).next().unwrap();

            let duration = next_run - now;
            sleep(duration.to_std().unwrap()).await;

            let db_pool = get_database_pool(&self.config).await;

            let recurrences_repository = RecurrencesRepository::new(&db_pool);
            let bill_repository = BillRepository::new(&db_pool);

            let recurrences_service = RecurrencesService::new(recurrences_repository);
            let bill_service = BillService::new(bill_repository);

            self.check_and_create_bills(recurrences_service, bill_service)
                .await;

            db_pool.close().await;

            tracing::info!("Next run scheduled at: {}", next_run);
        }
    }
}

impl RecurrenceScheduler {
    async fn check_and_create_bills<'a>(
        &self,
        recurrence_service: RecurrencesService<'a>,
        bill_service: BillService<'a>,
    ) {
        tracing::info!("Checking and creating bills...");

        let recurrences = match recurrence_service.get_active_recurrences().await {
            Ok(recurrences) => recurrences,
            Err(e) => {
                tracing::error!("Error while getting active recurrences: {}", e);
                return;
            }
        };

        tracing::info!("Found {} active recurrences", recurrences.len());

        for recurrence in recurrences {
            let due_date = NaiveDate::from_ymd_opt(
                Utc::now().year(),
                Utc::now().month(),
                recurrence.day_of_due.try_into().unwrap(),
            )
            .unwrap();

            let recurrence_name = recurrence.name.to_string();
            let recurrence_user_id = recurrence.user_id;

            let request = bill_service.get_by_name_and_due_date(
                &recurrence_name,
                &recurrence_user_id,
                &due_date,
            );

            match request.await {
                Ok(Some(bill)) => {
                    tracing::warn!(
                        "Bill already exists for recurrence: {}, the bill id is: {}",
                        recurrence.name,
                        bill.id
                    );
                    continue;
                }
                Ok(None) => {
                    let bill = CreateBill {
                        name: recurrence.name,
                        amount: recurrence.average_amount,
                        status: "Pending".to_string(),
                        user_id: recurrence.user_id,
                        is_generated_by_recurrence: true,
                        due_date,
                    };

                    let bill_id = bill_service.create_bill(bill).await.unwrap();
                    tracing::info!("Bill created with id: {}", bill_id);
                }
                Err(e) => {
                    tracing::error!("Error while checking bill: {}", e);
                    continue;
                }
            }
        }

        tracing::info!("Finished checking and creating bills...");
    }
}
