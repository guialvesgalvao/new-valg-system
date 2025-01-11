use chrono::{DateTime, NaiveDate};
use sqlx::types::BigDecimal;
use sqlx::FromRow;

use super::bill_status::BillStatus;

/// Esse struct é o que o SQLx usa para mapear a tabela 'bills'
#[derive(Debug, FromRow)]
pub struct Bill {
    pub id: i32,
    pub name: String,
    pub amount: BigDecimal,
    pub due_date: NaiveDate,

    // Mantemos como String para SQLx
    pub status: String,

    pub is_generated_by_recurrence: bool,
    pub user_id: u32,
    pub modified_at: DateTime<chrono::Utc>,
    pub created_at: DateTime<chrono::Utc>,
}

/// Exemplo de método auxiliar que converte status:String -> enum
impl Bill {
    pub fn bill_status(&self) -> Option<BillStatus> {
        BillStatus::from_str(&self.status)
    }
}

pub struct CreateBill {
    pub name: String,
    pub amount: BigDecimal,
    pub due_date: NaiveDate,
    pub status: BillStatus,
    pub is_generated_by_recurrence: bool,
    pub user_id: u32,
}
