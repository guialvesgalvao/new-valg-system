import Cypress from 'cypress';

describe('Testes da rota PUT /bills', () => {
    it('Deve atualizar uma conta com sucesso', () => {
      cy.request({
        method: 'PUT',
        url: '/bills',
        body: {
          data: {
            id: 2,
            name: 'Nova Conta de Luz',
            amount: 250.0,
            status: 'pago',
            due_date: '2024-02-15',
          },
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('message', 'Conta atualizada com sucesso!');
      });
    });
  
    it('Deve retornar erro 400 quando o id não é informado para atualização', () => {
      cy.request({
        method: 'PUT',
        url: '/bills',
        failOnStatusCode: false,
        body: {
          data: {
            name: "conta sem id"
          },
        },
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('error', 'É obrigatório utilizar informar o ID da conta.');
      });
    });

    it('Deve retornar erro 400 quando nenhum campo é informado para atualização', () => {
      cy.request({
        method: 'PUT',
        url: '/bills',
        failOnStatusCode: false,
        body: {
          data: {
            id: 9,
          },
        },
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('error', 'Nenhum campo foi informado para atualização.');
      });
    });
  
    it('Deve retornar erro 404 de conta não encontrada', () => {
      cy.request({
        method: 'PUT',
        url: '/bills',
        failOnStatusCode: false,
        body: {
          data: {
            id: 9999999999
          },
        },
      }).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body).to.have.property('error', 'Conta não encontrada.');
      });
    });
  });
  