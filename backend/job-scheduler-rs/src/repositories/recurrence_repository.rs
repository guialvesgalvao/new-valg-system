use anyhow::{Context, Result};
use sqlx::{MySql, Pool};

use crate::models::bill_recurrence_model::RecurrenceModel;

#[derive(Debug)]
pub struct RecurrencesRepository {
    pool: Pool<MySql>,
}

impl RecurrencesRepository {
    pub fn new(pool: Pool<MySql>) -> Self {
        Self { pool }
    }

    /// Retorna todas as recorrências ativas, ou seja, aquelas que estão habilitadas (`enabled = 1`)
    /// e cujo `end_date` é `NULL` ou maior/igual à data atual.
    ///
    /// # Erros
    ///
    /// Retorna um erro se ocorrer qualquer problema na execução da query ou na decodificação
    /// dos resultados.
    pub async fn get_active_recurrences(&self) -> Result<Vec<RecurrenceModel>> {
        let query = r#"
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
                enabled = 1
                AND (end_date IS NULL OR end_date >= CURDATE())
        "#;

        let recurrences = sqlx::query_as::<_, RecurrenceModel>(query)
            .fetch_all(&self.pool)
            .await
            .context("Failed to fetch active recurrences from the database")?;

        Ok(recurrences)
    }
}
