#[test]
fn test_config_bootstrap() {
    let result = job_scheduler_rust::bootstrap::validate_config(
        &job_scheduler_rust::config::environment::Config {
            database_url: "".to_string(),
            environment: "".to_string(),
        },
    );
    assert_eq!(result, Err("Environment is not set".to_string()));
}

#[test]
fn test_config_database_url_bootstrap() {
    let result = job_scheduler_rust::bootstrap::validate_config(
        &job_scheduler_rust::config::environment::Config {
            database_url: "".to_string(),
            environment: "production".to_string(),
        },
    );

    assert_eq!(result, Err("Database URL is not set".to_string()));
}
