import Cypress from 'cypress';

describe('Testes da rota POST /bills', () => {
    it('Deve criar uma conta com sucesso (dataType=json)', () => {
      cy.request({
        method: 'POST',
        url: '/bills',
        body: {
          dataType: 'json',
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
        expect(response.body).to.have.property('message', 'Conta criada com sucesso!');
      });
    });
  
    it('Deve criar uma conta com sucesso (dataType=text)', () => {
      cy.request({
        method: 'POST',
        url: '/bills',
        body: {
          dataType: 'text',
          data: 'Aluguel,700,2025-05-01,pendente,true'
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('message', 'Conta criada com sucesso!');
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
          "os parâmetros 'dataType' e 'data' são obrigatórios"
        );
      });
    });
  
    it('Deve retornar erro 400 quando a conta não possui campos obrigatórios', () => {
      cy.request({
        method: 'POST',
        url: '/bills',
        failOnStatusCode: false,
        body: {
          dataType: 'json',
          data: {
            amount: 150.75,
            due_date: '2024-01-10',
          },
        },
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property(
          'error',
          'A conta informada não possui nome, valor ou data de vencimento'
        );
      });
    });
  });
  