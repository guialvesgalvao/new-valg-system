use crate::{
    models::bill_recurrence_model::BillRecurrence,
    repositories::recurrence_repository::RecurrencesRepository,
};

#[derive(Debug)]
pub struct RecurrencesService<'a> {
    pub repository: RecurrencesRepository<'a>,
}

impl<'a> RecurrencesService<'a> {
    pub fn new(repository: RecurrencesRepository<'a>) -> Self {
        Self { repository }
    }

    pub async fn get_active_recurrences(&self) -> Result<Vec<BillRecurrence>, sqlx::Error> {
        self.repository.get_active_recurrences().await
    }
}
