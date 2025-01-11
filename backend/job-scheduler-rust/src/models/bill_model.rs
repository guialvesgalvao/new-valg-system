use chrono::{DateTime, NaiveDate};
use sqlx::{prelude::FromRow, types::BigDecimal};

pub enum BillStatus {
    Paid,
    Pending,
    Overdue,
}

#[derive(Debug, FromRow)]

pub struct Bill {
    pub id: i32,

    pub name: String,

    pub amount: BigDecimal,

    pub due_date: NaiveDate,

    pub status: String,

    pub is_generated_by_recurrence: bool,

    pub user_id: u32,

    pub modified_at: DateTime<chrono::Utc>,
    pub created_at: DateTime<chrono::Utc>,
}

pub struct CreateBill {
    pub name: String,
    pub amount: BigDecimal,
    pub due_date: NaiveDate,
    pub status: String,
    pub is_generated_by_recurrence: bool,
    pub user_id: u32,
}
