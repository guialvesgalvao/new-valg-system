mod bootstrap;
mod config;
mod models;
mod repositories;
mod scheduler;
mod services;

use bootstrap::validate_config;

use config::environment::Config;

use config::logger;
use config::scheduler::SchedulerConfig;

use scheduler::{RecurrenceScheduler, Scheduler};

use tokio::runtime::Runtime;

fn main() {
    let rt = Runtime::new().unwrap();
    let config: Config = Config::from_env();

    if let Err(e) = validate_config(&config) {
        eprintln!("Configuration validation failed: {}", e);
        return;
    }

    let scheduler_config = generate_scheduler_config(&config);

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

        let recurrence_scheduler = RecurrenceScheduler::new(config);
        recurrence_scheduler.start_scheduler(scheduler_config).await;
    });
}

fn generate_scheduler_config(config: &Config) -> SchedulerConfig {
    SchedulerConfig {
        cron_expression: if config.environment == "production" {
            "0 0 1 * * *".to_string()
        } else {
            "0 * * * * *".to_string()
        },
    }
}
