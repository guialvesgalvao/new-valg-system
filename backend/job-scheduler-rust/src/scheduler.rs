use async_trait::async_trait;

use chrono::{Datelike, NaiveDate, Utc};
use cron::Schedule;
use rust_decimal::prelude::ToPrimitive;
use std::str::FromStr;

use tokio::time::sleep;

use crate::{
    config::scheduler::SchedulerConfig,
    models::bill_model::CreateBill,
    services::{bill_service::BillService, recurrence_service::RecurrencesService},
};

#[async_trait]
pub trait Scheduler {
    async fn start_scheduler(&self, config: SchedulerConfig);
}

pub struct RecurrenceScheduler<'a> {
    bill_service: BillService<'a>,
    recurrence_service: RecurrencesService<'a>,
}

impl<'a> RecurrenceScheduler<'a> {
    pub fn new(bill_service: BillService<'a>, recurrence_service: RecurrencesService<'a>) -> Self {
        RecurrenceScheduler {
            bill_service,
            recurrence_service,
        }
    }
}

#[async_trait]
impl<'a> Scheduler for RecurrenceScheduler<'a> {
    async fn start_scheduler(&self, config: SchedulerConfig) {
        tracing::info!("Scheduler started!");

        let schedule = Schedule::from_str(&config.cron_expression).unwrap();

        loop {
            let now = Utc::now();
            let next_run = schedule.upcoming(Utc).next().unwrap();

            let duration = next_run - now;
            sleep(duration.to_std().unwrap()).await;

            self.check_and_create_bills().await;
        }
    }
}

impl<'a> RecurrenceScheduler<'a> {
    async fn check_and_create_bills(&self) {
        tracing::info!("Checking and creating bills...");

        let recurrences = match self.recurrence_service.get_active_recurrences().await {
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
                recurrence.day_of_due.to_u32().unwrap(),
            )
            .unwrap();

            let recurrence_name = recurrence.name.to_string();
            let recurrence_user = recurrence.user.to_string();

            let request = self.bill_service.get_by_name_and_due_date(
                &recurrence_name,
                &recurrence_user,
                &due_date,
            );

            // Check if the bill already exists for the recurrence and due date
            // If it does, log a warning and continue to the next recurrence
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
                        user: recurrence.user,
                        is_generated_by_recurrence: true,
                        due_date,
                    };

                    let bill_id = self.bill_service.create_bill(bill).await.unwrap();
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
