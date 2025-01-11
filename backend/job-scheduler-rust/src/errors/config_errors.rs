use thiserror::Error;

#[derive(Debug, Error, PartialEq)]
pub enum ConfigError {
    #[error("Environment is not set")]
    MissingEnvironment,

    #[error("Database URL is not set")]
    MissingDatabaseUrl,
}
