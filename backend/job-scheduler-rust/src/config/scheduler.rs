#[derive(Debug, Clone)]
pub struct SchedulerConfig {
    pub cron_expression: String,
}

impl SchedulerConfig {
    pub fn new(cron_expression: String) -> Self {
        Self { cron_expression }
    }
}
