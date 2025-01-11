// models/bill_status.rs
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum BillStatus {
    Paid,
    Pending,
    Overdue,
}

impl BillStatus {
    pub fn as_str(&self) -> &'static str {
        match self {
            BillStatus::Paid => "Paid",
            BillStatus::Pending => "Pending",
            BillStatus::Overdue => "Overdue",
        }
    }
    
    pub fn from_str(s: &str) -> Option<Self> {
        match s {
            "Paid" => Some(BillStatus::Paid),
            "Pending" => Some(BillStatus::Pending),
            "Overdue" => Some(BillStatus::Overdue),
            _ => None,
        }
    }
}
