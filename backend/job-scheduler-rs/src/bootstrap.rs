use crate::{config::environment::Config, errors::config_errors::ConfigError};
use anyhow::{bail, Result};

/// Valida se as variáveis mínimas de ambiente foram definidas.
///
/// # Erros
///
/// Retorna `Err(ConfigError)` se:
/// - `environment` estiver vazio
/// - `database_url` estiver vazio
///
/// Retorna `Ok(())` se ambos estiverem configurados corretamente.
pub fn validate_config(config: &Config) -> Result<(), ConfigError> {
    if config.environment.is_empty() {
        return Err(ConfigError::MissingEnvironment);
    }

    if config.database_url.is_empty() {
        return Err(ConfigError::MissingDatabaseUrl);
    }

    Ok(())
}
