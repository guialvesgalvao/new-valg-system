use job_scheduler_rust::config::database::get_database_pool;
use job_scheduler_rust::config::environment::Config;

#[tokio::test]
async fn test_connect_database() {
    // Load the configuration from the environment
    let config = Config::from_env();

    // Connect to the database
    let db_pool = get_database_pool(&config).await;

    // Check if the connection is successful
    assert!(db_pool.is_ok());
}
