import { IBill } from "../../../src/shared/interfaces/IBill";
import Cypress from 'cypress'

describe("Testa o funcionamento da API padrão para busca de contas", () => {
  it("Deve retornar uma lista de contas em formato de array", async () => {
    cy.request("/bills").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
      expect(response.body.length).to.be.greaterThan(0);
    });

    cy.request("/bills?returnMode=text").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("string");
    });

    cy.request("/bills?isOverdue=true").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
      expect(response.body.length).to.be.greaterThan(0);
      const now = new Date();
      response.body.forEach((bill: IBill) => {
        expect(new Date(bill.dueDate)).to.be.lessThan(now);
      });
    });
  });

  it("Casos de erro na passagem dos parâmetros na URL", () => {

    cy.request({ url: "/bills?isOverdue=invalid", failOnStatusCode: false }).then((response) => {
      expect(response.status).to.eq(500);
      expect(response.body).to.have.property("error", "Invalid parameter 'isOverdue': invalid");
    });

    cy.request({ url: "/bills?returnMode=invalid", failOnStatusCode: false }).then((response) => {
      expect(response.status).to.eq(500);
      expect(response.body).to.have.property("error", "Invalid parameter 'returnMode': invalid");
    });
  });
});
