use anyhow::{Context, Result};
use dotenv::dotenv;
use std::env;

#[derive(Debug, Clone)]
pub struct Config {
    /// URL de conexão com o banco de dados.
    pub database_url: String,

    /// Ambiente em que a aplicação está sendo executada (e.g., "development", "production").
    pub environment: String,
}

impl Config {
    /// Carrega as variáveis de ambiente usando `dotenv` e constrói um `Config`.
    ///
    /// Retorna `Err` se `DATABASE_URL` não estiver definida.
    pub fn from_env() -> Result<Self> {
        dotenv().ok();

        let database_url = env::var("DATABASE_URL")
            .context("DATABASE_URL must be set in .env or environment variables")?;

        let environment = env::var("RUST_ENV").unwrap_or_else(|_| "development".to_string());

        Ok(Self {
            database_url,
            environment,
        })
    }
}
