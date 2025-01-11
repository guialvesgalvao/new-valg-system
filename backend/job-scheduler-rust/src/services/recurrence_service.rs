use crate::{
    models::bill_recurrence_model::RecurrenceModel,
    repositories::recurrence_repository::RecurrencesRepository,
};

#[derive(Debug)]
pub struct RecurrencesService {
    pub repository: RecurrencesRepository,
}

impl RecurrencesService {
    pub fn new(repository: RecurrencesRepository) -> Self {
        Self { repository }
    }

    pub async fn get_active_recurrences(&self) -> Result<Vec<RecurrenceModel>, sqlx::Error> {
        self.repository.get_active_recurrences().await
    }
}
