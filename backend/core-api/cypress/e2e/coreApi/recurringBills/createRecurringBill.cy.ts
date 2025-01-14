import Cypress from 'cypress';

describe('Testes da rota POST /recurring-bills', () => {
    it('Deve criar uma conta recorrente com sucesso', () => {
      cy.request({
        method: 'POST',
        url: '/recurring-bills',
        body: {
          data: {
            name: 'Conta de Luz',
            amount: 150.75,
            due_date: '2024-01-10',
            status: 'pendente',
            isRecurring: false,
          },
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('message', 'Conta recorrente criada com sucesso!');
      });
    });

    it('Deve retornar erro 400 ao não enviar os parâmetros obrigatórios', () => {
      cy.request({
        method: 'POST',
        url: '/bills',
        failOnStatusCode: false,
        body: {},
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property(
          'error',
          "É necessário informar o parâmetro 'data' com o array de contas à ser criada"
        );
      });
    });

    it('Deve retornar erro 400 ao não enviar os parâmetros obrigatórios', () => {
      cy.request({
        method: 'POST',
        url: '/bills',
        failOnStatusCode: false,
        body: {},
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property(
          'error',
          "É necessário informar o parâmetro 'data' com o array de contas à ser criada"
        );
      });
    });

  });
  