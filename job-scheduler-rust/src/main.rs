mod bootstrap;
mod config;
mod models;
mod repositories;
mod scheduler;
mod services;

use bootstrap::validate_config;
use config::database::get_database_pool;
use config::environment::Config;

use config::logger;
use config::scheduler::SchedulerConfig;
use repositories::bill_repository::BillRepository;
use repositories::recurrence_repository::RecurrencesRepository;
use scheduler::{RecurrenceScheduler, Scheduler};

use services::bill_service::BillService;
use services::recurrence_service::RecurrencesService;

use tokio::runtime::Runtime;

fn main() {
    let rt = Runtime::new().unwrap();
    let config: Config = Config::from_env();

    if let Err(e) = validate_config(&config) {
        eprintln!("Configuration validation failed: {}", e);
        return;
    }

    let scheduler_config = SchedulerConfig {
        cron_expression: if config.environment == "production" {
            "0 0 1 * * *".to_string()
        } else {
            "0 * * * * *".to_string()
        },
    };

    let _guard = logger::init_logger();

    rt.block_on(async {
        println!(
            "Starting the application, environment: {}",
            config.environment
        );
        tracing::info!(
            "Starting the application, environment: {}",
            config.environment
        );

        let db_pool = get_database_pool(&config).await;

        let recurrences_repository = RecurrencesRepository::new(&db_pool);
        let bill_repository = BillRepository::new(&db_pool);

        let recurrences_service = RecurrencesService::new(recurrences_repository);
        let bill_service = BillService::new(bill_repository);

        let recurrence_scheduler = RecurrenceScheduler::new(bill_service, recurrences_service);

        recurrence_scheduler.start_scheduler(scheduler_config).await;
    });
}
