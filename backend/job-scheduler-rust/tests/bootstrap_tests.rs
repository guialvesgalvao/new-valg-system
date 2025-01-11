use job_scheduler_rust::errors::config_errors::ConfigError;

#[test]
fn test_config_bootstrap() {
    let result = job_scheduler_rust::bootstrap::validate_config(
        &job_scheduler_rust::config::environment::Config {
            database_url: "".to_string(),
            environment: "".to_string(),
        },
    );

    assert_eq!(result, Err(ConfigError::MissingEnvironment));
}

#[test]
fn test_config_database_url_bootstrap() {
    let result = job_scheduler_rust::bootstrap::validate_config(
        &job_scheduler_rust::config::environment::Config {
            database_url: "".to_string(),
            environment: "production".to_string(),
        },
    );

    assert_eq!(result, Err(ConfigError::MissingDatabaseUrl));
}

#[test]
fn test_config_environment_bootstrap() {
    let result = job_scheduler_rust::bootstrap::validate_config(
        &job_scheduler_rust::config::environment::Config {
            database_url: "postgres://localhost:5432".to_string(),
            environment: "".to_string(),
        },
    );

    assert_eq!(result, Err(ConfigError::MissingEnvironment));
}
