use crate::{
    models::bill_model::{Bill, CreateBill},
    repositories::bill_repository::BillRepository,
};

pub struct BillService<'a> {
    pub repository: BillRepository<'a>,
}

impl<'a> BillService<'a> {
    pub fn new(repository: BillRepository<'a>) -> Self {
        Self { repository }
    }

    pub async fn get_by_name_and_due_date(
        &self,
        name: &String,
        user_id: &i32,
        date: &chrono::NaiveDate,
    ) -> Result<Option<Bill>, sqlx::Error> {
        self.repository
            .get_by_name_and_due_date(name, user_id, date)
            .await
    }

    pub async fn create_bill(&self, data: CreateBill) -> Result<u64, sqlx::Error> {
        self.repository.create_bill(data).await
    }
}
