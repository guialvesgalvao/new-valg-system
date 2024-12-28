use sqlx::{MySql, Pool};

use crate::models::bill_recurrence_model::BillRecurrence;

#[derive(Debug)]
pub struct RecurrencesRepository<'a> {
    pub pool: &'a Pool<MySql>,
}

impl<'a> RecurrencesRepository<'a> {
    pub fn new(pool: &'a Pool<MySql>) -> Self {
        Self { pool }
    }

    pub async fn get_active_recurrences(&self) -> Result<Vec<BillRecurrence>, sqlx::Error> {
        let recurrences = sqlx::query_as::<_, BillRecurrence>(
            r#"
            SELECT
                id,
                name,
                average_amount,
                day_of_due,
                end_date,
                user,
                enabled,
                modified_at,
                created_at
            FROM
                bill_recurrences
            WHERE
                enabled = 1 AND end_date IS NULL OR end_date >= CURDATE()
            "#,
        )
        .fetch_all(self.pool)
        .await?;

        Ok(recurrences)
    }
}
