describe("modal window test", () => {
  before("the page is available", () => {
    cy.viewport(1280, 720);
    cy.visit("http://localhost:3000");
  });

  it("modal window test", () => {
    cy.get("[class^=Ingredient_ingredient__]").first().click();
    cy.get("[class^=Modal_modal__]").should("exist").contains("Детали ингредиента");
    cy.get("[class^=Modal_btn__]").click();
    cy.get("body").should("not.have.descendants", "[class^=Modal_modal__]");
  });
});

describe("ingredients dragging and ordering test", () => {
  before("the page is available", () => {
    cy.viewport(1280, 720);
    cy.visit("http://localhost:3000");
  });
  beforeEach("interception of authorization requests and post orders", () => {
    cy.intercept("GET", "api/auth/user", {fixture: "testUser.json"});
    cy.intercept("POST", "api/orders", {fixture: "testOrder.json"});
    window.localStorage.setItem("refreshToken", JSON.stringify("testRefreshToken"));
    cy.setCookie("accessToken", "testAccessToken");
    cy.window().its("testCyStore").invoke("dispatch", {type: "USER_LOGGED_IN"});
  });

  it("burger order", () => {
    cy.get("[class^=Ingredient_ingredient__]").first().as("bun");
    cy.get("[class^=Ingredient_ingredient__]").last().as("filling");
    cy.get("[class^=BurgerConstructor_constructor__]").as("constructor");

    cy.get("@bun").trigger("dragstart");
    cy.get("@constructor").trigger("dragenter").trigger("drop");

    cy.get("@filling").trigger("dragstart");
    cy.get("@constructor").trigger("dragenter").trigger("drop");

    cy.get(".counter__num").as("counter");
    cy.get("@counter").first().should("contain", "2");
    cy.get("@counter").last().should("contain", "1");

    cy.get("@constructor").contains("Оформить заказ").click();
    cy.get("[class^=Modal_modal__]").should("exist").contains("12345");
    cy.get("[class^=Modal_btn__]").click();
    cy.get("body").should("not.have.descendants", "[class^=Modal_modal__]");
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.window().its("testCyStore").invoke("dispatch", {type: "USER_LOGGED_OUT"});
  });
});
