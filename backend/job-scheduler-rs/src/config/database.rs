use anyhow::{Context, Result};
use sqlx::{mysql::MySqlPoolOptions, MySql, Pool};

use crate::config::environment::Config;

pub async fn get_database_pool(config: &Config) -> Result<Pool<MySql>> {
    // Exemplo de opções personalizadas para o pool
    let pool = MySqlPoolOptions::new()
        .max_connections(5) // máximo de conexões
        .connect(&config.database_url)
        .await
        .context("Failed to connect to the MySQL database")?;

    Ok(pool)
}
