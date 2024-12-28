use crate::config::environment::Config;
use sqlx::{MySql, MySqlPool, Pool};

pub async fn get_database_pool(config: &Config) -> Pool<MySql> {
    MySqlPool::connect(&config.database_url)
        .await
        .expect("Failed to connect to database")
}
