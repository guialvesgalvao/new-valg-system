use crate::config::environment::Config;

pub fn validate_config(config: &Config) -> Result<(), String> {
    if config.environment.is_empty() {
        return Err("Environment is not set".to_string());
    }

    if config.database_url.is_empty() {
        return Err("Database URL is not set".to_string());
    }

    Ok(())
}
