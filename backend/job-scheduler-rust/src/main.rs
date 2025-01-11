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

use anyhow::Result;

fn main() -> Result<()> {
    let rt = Runtime::new()?;

    let config: Config = Config::from_env();

    if let Err(e) = validate_config(&config) {
        eprintln!("Configuration validation failed: {}", e);

        return Ok(());
    }

    let scheduler_config = generate_scheduler_config(&config);

    let _guard = logger::init_logger();

    // Executa a lógica assíncrona dentro do runtime
    rt.block_on(async {
        println!(
            "Starting the application, environment: {}",
            config.environment
        );
        tracing::info!(
            "Starting the application, environment: {}",
            config.environment
        );

        let recurrence_scheduler = RecurrenceScheduler::new(config, scheduler_config);

        if let Err(e) = recurrence_scheduler.start_scheduler().await {
            tracing::error!("Error in scheduler: {:?}", e);
        }

        Ok::<(), anyhow::Error>(())
    })?;

    Ok(())
}

fn generate_scheduler_config(config: &Config) -> SchedulerConfig {
    SchedulerConfig {
        cron_expression: if config.environment == "production" {
            // Exemplo: executar a cada 1 mês em ambiente de produção (dia 1)
            "0 0 3 1 * *".to_string()
        } else {
            // Exemplo: executar a cada 1 minuto em ambiente de teste
            "0 * * * * *".to_string()
        },
    }
}
