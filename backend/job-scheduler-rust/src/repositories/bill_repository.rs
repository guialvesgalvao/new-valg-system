use sqlx::{MySql, Pool};

use crate::models::bill_model::{Bill, CreateBill};

#[derive(Clone)]
pub struct BillRepository {
    pub pool: Pool<MySql>,
}

impl BillRepository {
    pub fn new(pool: Pool<MySql>) -> Self {
        Self { pool }
    }

    pub async fn get_by_name_and_due_date(
        &self,
        name: &str,
        user_id: &u32,
        due_date: &chrono::NaiveDate,
    ) -> Result<Option<Bill>, sqlx::Error> {
        let bills = sqlx::query_as::<_, Bill>(
            r#"
            SELECT
                id,
                name,
                amount,
                due_date,
                status,
                is_generated_by_recurrence,
                user_id,
                modified_at,
                created_at
            FROM
                bills
            WHERE
                name = ? AND user_id = ? AND due_date = ?
            "#,
        )
        .bind(name)
        .bind(user_id)
        .bind(due_date)
        .fetch_optional(&self.pool)
        .await?;

        Ok(bills)
    }

    pub async fn create_bill(&self, data: CreateBill) -> Result<u64, sqlx::Error> {
        let result = sqlx::query(
            r#"
            INSERT INTO bills (name, amount, due_date, status, user_id, is_generated_by_recurrence)
            VALUES (?, ?, ?, ?, ?, ?)
            "#,
        )
        .bind(data.name)
        .bind(data.amount)
        .bind(data.due_date)
        .bind(data.status)
        .bind(data.user_id)
        .bind(data.is_generated_by_recurrence)
        .execute(&self.pool)
        .await?;

        Ok(result.last_insert_id())
    }
}
