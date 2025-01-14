import Cypress from 'cypress';

describe('Testes da rota DELETE /bills/:id', () => {
    it('Deve deletar a conta com sucesso quando um ID válido é fornecido', () => {
      cy.request({
        method: 'DELETE',
        url: '/recurring-bills/8'
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('message', 'Conta deletada com sucesso');
      });
    });
  
    it('Deve retornar erro 400 se o ID não for fornecido (ou for inválido)', () => {
      cy.request({
        method: 'DELETE',
        url: '/recurring-bills/',
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400);
      });
    });
  
    it('Deve retornar 404 caso a conta não exista', () => {
      cy.request({
        method: 'DELETE',
        url: '/recurring-bills/999999999',
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body).to.have.property('error', 'Conta não encontrada.');
      });
    });
  });
  