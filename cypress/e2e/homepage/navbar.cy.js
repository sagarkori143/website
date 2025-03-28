describe("Navbar General Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should find and display the Navbar logo", () => {
    cy.get('[data-testid="Navbar-logo"]', { timeout: 10000 }).should("be.visible");
  });

  it("should navigate to the homepage when clicking the logo", () => {
    cy.get('[data-testid="Navbar-logo"]').click();
    cy.url().should("match", new RegExp(`^${Cypress.config("baseUrl")}\/?$`));
  });

  it("should find the Navbar main container", () => {
    cy.viewport(1024, 768);
    cy.get('[data-testid="Navbar-Main"]').should("be.visible");
  });

  it("should find the Docs link", () => {
    cy.viewport(1024, 768);
    cy.get('[data-testid="Navbar-Docs-Link"]').should("exist").and("be.visible");
  });
});

describe("Navbar Dropdown Tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1024, 768);
  });

  it("should find the Docs link before hover", () => {
    cy.get('[data-testid="Navbar-Docs-Link"]').should("be.visible");
  });

  it("should trigger hover on the Docs link", () => {
    cy.get('[data-testid="Navbar-Docs-Link"]').trigger("mouseover");
  });

  it("should display the LearningPanel after hovering over Docs", () => {
    cy.get('[data-testid="Navbar-Docs-Link"]').trigger("mouseover");
    cy.get('[data-testid="LearningPanel-FlyoutMenu-Flyout"]').should("be.visible");
  });

});
