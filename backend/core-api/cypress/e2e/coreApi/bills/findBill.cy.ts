import Cypress from 'cypress';

describe('Testes da rota POST /bills/finder', () => {
    it('Deve retornar status 200 e a propriedade "message" com o ID da conta', () => {
      cy.request({
        method: 'POST',
        url: '/bills/finder',
        body: {
          data: 'Texto que supostamente identifica a conta',
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('message');
      });
    });
  
    it('Deve retornar erro 400 quando "data" está ausente', () => {
      cy.request({
        method: 'POST',
        url: '/bills/finder',
        failOnStatusCode: false,
        body: {},
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property(
          'error',
          'É necessário informar o parâmetro data com o texto do usuário'
        );
      });
    });
  
    it('Deve retornar erro 400 quando "data" está vazio', () => {
      cy.request({
        method: 'POST',
        url: '/bills/finder',
        failOnStatusCode: false,
        body: {
          data: '   ',
        },
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property(
          'error',
          'É necessário informar o parâmetro data com o texto do usuário'
        );
      });
    });
  
    it('Deve retornar erro 500 quando não for possível determinar o ID da conta', () => {
      cy.request({
        method: 'POST',
        url: '/bills/finder',
        failOnStatusCode: false,
        body: {
          data: 'Texto que cause erro no findBillIdWithOpenAI',
        },
      }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.have.property(
          'error',
          'Não foi possível determinar o ID da conta a partir da fala informada.'
        );
      });
    });
  });
  