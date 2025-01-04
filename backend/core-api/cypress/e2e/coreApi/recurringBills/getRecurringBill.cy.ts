import Cypress from 'cypress';

describe("Testa o funcionamento da API padrão para busca de contas", () => {
  it("Deve retornar uma lista de contas em formato de array", async () => {
    cy.request("/recurring-bills").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
      expect(response.body.length).to.be.greaterThan(0);
    });
  });
});