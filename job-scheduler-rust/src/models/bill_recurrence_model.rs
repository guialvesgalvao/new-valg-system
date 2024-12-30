use chrono::{DateTime, NaiveDate};

use sqlx::{prelude::FromRow, types::BigDecimal};

#[derive(Debug, FromRow)]
pub struct BillRecurrence {
    pub id: i32,

    pub name: String,

    pub average_amount: BigDecimal,

    pub day_of_due: i32,

    pub end_date: Option<NaiveDate>,

    pub user: String,

    pub enabled: bool,

    pub modified_at: DateTime<chrono::Utc>,
    pub created_at: DateTime<chrono::Utc>,
}

pub struct CreateBillRecurrence {
    pub name: String,
    pub average_amount: i32,
    pub day_of_due: i32,
    pub end_date: Option<NaiveDate>,
    pub user: String,
}
