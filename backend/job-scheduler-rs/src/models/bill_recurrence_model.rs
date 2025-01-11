use chrono::{DateTime, NaiveDate};

use sqlx::{prelude::FromRow, types::BigDecimal};

#[derive(Debug, FromRow)]
pub struct RecurrenceModel {
    pub id: i32,

    pub name: String,

    pub average_amount: BigDecimal,

    pub day_of_due: i32,

    pub end_date: Option<NaiveDate>,

    pub user_id: u32,

    pub enabled: bool,

    pub modified_at: DateTime<chrono::Utc>,
    pub created_at: DateTime<chrono::Utc>,
}
