use anyhow::{Context, Result};
use chrono::NaiveDate;

use crate::{
    models::bill_model::{Bill, CreateBill},
    repositories::bill_repository::BillRepository,
};

/// Serviço responsável por interagir com os repositórios de `Bill`.
#[derive(Clone)]
pub struct BillService {
    /// Repositório de `Bill`, injetado via construtor.
    repository: BillRepository,
}

impl BillService {
    /// Cria um novo `BillService` recebendo um `BillRepository`.
    pub fn new(repository: BillRepository) -> Self {
        Self { repository }
    }

    /// Busca uma fatura (`Bill`) pelo nome, ID de usuário e data de vencimento.
    ///
    /// - Retorna `Ok(Some(bill))` se o registro for encontrado.
    /// - Retorna `Ok(None)` se não houver registro correspondente.
    /// - Retorna `Err(...)` se ocorrer algum erro na operação com o banco de dados.
    pub async fn get_by_name_and_due_date(
        &self,
        name: &str,
        user_id: u32,
        due_date: &NaiveDate,
    ) -> Result<Option<Bill>> {
        let bill = self
            .repository
            .get_by_name_and_due_date(name, &user_id, due_date)
            .await
            .context("Failed to retrieve bill by name and due date")?;

        Ok(bill)
    }

    /// Cria uma nova fatura (`Bill`) a partir dos dados fornecidos em `CreateBill`.
    ///
    /// - Retorna `Ok(u64)` com o ID da fatura criada.
    /// - Retorna `Err(...)` em caso de falha no banco de dados.
    pub async fn create_bill(&self, data: CreateBill) -> Result<u64> {
        let new_bill_id = self
            .repository
            .create_bill(data)
            .await
            .context("Failed to create new bill")?;

        Ok(new_bill_id)
    }
}
