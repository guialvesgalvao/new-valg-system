use crate::{
    models::bill_recurrence_model::RecurrenceModel,
    repositories::recurrence_repository::RecurrencesRepository,
};
use anyhow::{Context, Result};

/// Serviço responsável por operações relacionadas a RecurrenceModel.
#[derive(Debug)]
pub struct RecurrencesService {
    /// Repositório de RecurrenceModel, usado internamente pelo serviço.
    repository: RecurrencesRepository,
}

impl RecurrencesService {
    /// Cria uma nova instância de `RecurrencesService` a partir de um `RecurrencesRepository`.
    pub fn new(repository: RecurrencesRepository) -> Self {
        Self { repository }
    }

    /// Obtém todas as recorrências ativas do banco de dados.
    ///
    /// # Erros
    ///
    /// Retorna um `Err` em caso de falha na operação com o banco (ex.: falha de conexão).
    pub async fn get_active_recurrences(&self) -> Result<Vec<RecurrenceModel>> {
        // Aqui usamos o método do repositório e adicionamos contexto caso dê erro.
        let recurrences = self
            .repository
            .get_active_recurrences()
            .await
            .context("Failed to fetch active recurrences from the repository")?;

        Ok(recurrences)
    }
}
