use anyhow::{Context, Result};
use chrono::NaiveDate;
use sqlx::{MySql, Pool};

use crate::models::bill_model::{Bill, CreateBill};

#[derive(Clone)]
pub struct BillRepository {
    pool: Pool<MySql>,
}

impl BillRepository {
    pub fn new(pool: Pool<MySql>) -> Self {
        Self { pool }
    }

    /// Busca uma fatura (`Bill`) pelo nome, ID do usuário e data de vencimento.
    ///
    /// Retorna `Ok(Some(Bill))` se existir, `Ok(None)` se não existir
    /// ou um erro (`Err`) se a query falhar.
    pub async fn get_by_name_and_due_date(
        &self,
        name: &str,
        user_id: &u32,
        due_date: &NaiveDate,
    ) -> Result<Option<Bill>> {
        let bill = sqlx::query_as::<_, Bill>(
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
        .await
        .context("Failed to retrieve a Bill by name, user_id, and due_date")?;

        Ok(bill)
    }

    /// Cria uma nova fatura (`Bill`) no banco de dados a partir de um `CreateBill`.
    ///
    /// Retorna o `id` (no caso do MySQL, `last_insert_id`) da fatura criada.
    /// Se ocorrer qualquer problema (conexão, constraints, etc.), retorna `Err`.
    pub async fn create_bill(&self, data: CreateBill) -> Result<u64> {
        let result = sqlx::query(
            r#"
            INSERT INTO bills (
                name,
                amount,
                due_date,
                status,
                user_id,
                is_generated_by_recurrence
            )
            VALUES (?, ?, ?, ?, ?, ?)
            "#,
        )
        .bind(data.name)
        .bind(data.amount)
        .bind(data.due_date)
        .bind(data.status.as_str())
        .bind(data.user_id)
        .bind(data.is_generated_by_recurrence)
        .execute(&self.pool)
        .await
        .context("Failed to insert a new Bill into the database")?;

        Ok(result.last_insert_id())
    }
}
