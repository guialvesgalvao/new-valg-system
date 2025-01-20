import Cypress from 'cypress';

describe('Testes da rota PATCH /recurring-bills', () => {
    it('Deve atualizar uma conta recorrente com sucesso', () => {
      cy.request({
        method: 'PATCH',
        url: '/recurring-bills',
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
        expect(response.body).to.have.property('message', 'Conta recorrente atualizada com sucesso!');
      });
    });
  
    it('Deve retornar erro 400 quando o id não é informado para atualização', () => {
      cy.request({
        method: 'PATCH',
        url: '/recurring-bills',
        failOnStatusCode: false,
        body: {
          data: {
            name: "conta sem id"
          },
        },
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('error', 'Id para atualização não informado');
      });
    });
  
    it("Deve retornar erro 400 quando o parâmetro 'data' não é informado para atualização", () => {
      cy.request({
        method: 'PATCH',
        url: '/recurring-bills',
        failOnStatusCode: false,
        body: {
        },
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('error', "É necessário informar o parâmetro 'data' com o array de contas à ser atualizada");
      });
    });

    it('Deve retornar erro 400 quando nenhum campo é informado para atualização', () => {
      cy.request({
        method: 'PATCH',
        url: '/recurring-bills',
        failOnStatusCode: false,
        body: {
          data: {
            teste: 9,
          },
        },
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('error', 'Nenhum campo foi informado para atualização.');
      });
    });
  
    it('Deve retornar erro 404 de conta não encontrada', () => {
      cy.request({
        method: 'PATCH',
        url: '/recurring-bills',
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
  