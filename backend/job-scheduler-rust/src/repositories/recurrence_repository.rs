use sqlx::{MySql, Pool};

use crate::models::bill_recurrence_model::RecurrenceModel;

#[derive(Debug)]
pub struct RecurrencesRepository {
    pub pool: Pool<MySql>,
}

impl RecurrencesRepository {
    pub fn new(pool: Pool<MySql>) -> Self {
        Self { pool }
    }

    pub async fn get_active_recurrences(&self) -> Result<Vec<RecurrenceModel>, sqlx::Error> {
        let recurrences = sqlx::query_as::<_, RecurrenceModel>(
            r#"
            SELECT
                id,
                name,
                average_amount,
                day_of_due,
                end_date,
                user_id,
                enabled,
                modified_at,
                created_at
            FROM
                bill_recurrences
            WHERE
                enabled = 1 AND end_date IS NULL OR end_date >= CURDATE()
            "#,
        )
        .fetch_all(&self.pool)
        .await?;

        Ok(recurrences)
    }
}
