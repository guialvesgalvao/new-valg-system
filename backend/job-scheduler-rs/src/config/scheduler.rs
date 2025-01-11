#[derive(Debug, Clone)]
pub struct SchedulerConfig {
    /// Expressão cron (ex. `"0 0 * * * *"` para executar todo dia às 0h).
    pub cron_expression: String,
}

impl SchedulerConfig {
    /// Cria um novo `SchedulerConfig` a partir de uma `cron_expression`.
    pub fn new(cron_expression: impl Into<String>) -> Self {
        Self {
            cron_expression: cron_expression.into(),
        }
    }

    /// Retorna a expressão cron configurada.
    pub fn cron_expression(&self) -> &str {
        &self.cron_expression
    }
}
