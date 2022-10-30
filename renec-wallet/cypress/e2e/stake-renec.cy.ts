import "@testing-library/cypress/add-commands"

const unlocked = {
  derivationPath: "bip44Change",
  mnemonic:"roast know quality leisure swallow purse where door into race rally injury maze oven multiply border regular glimpse play tourist athlete shrug hand lawn",
  seed: "9a1cd788b0d68ffcb78f1c1626f7c047f0df1b7d330e937a0905e73fbf215c4bd40a29c584905699ba0f5d44113c33d50d310c580174e3d54288bbeacb62bd15",
}

describe("staking renec", () => {
  beforeEach(() => {
    cy.visit("/", {
      onBeforeLoad(window) {
        window.localStorage.setItem("connectionEndpoint", "\"https://api-testnet.renec.foundation:8899\"")
        window.localStorage.setItem('unlocked', JSON.stringify(unlocked))
      }
    })
  })

  it("stake renec", () => {
    cy.get("[data-testid~='balance-item']").first().click()
    cy.findByRole("button", {name: 'Request Airdrop'}).click()
    cy.get("header").within(() => {
      cy.findByText("Staking").click()
    })
    cy.findByText("Validators staking list").should("be.visible")
    cy.get("[data-testid='staking-item']").first().within(() => {
      cy.findByText("Stake").click()
    })
    cy.findByTestId("create-staking-dialog").within(() => {
      cy.findByRole("button", {name: 'Stake'}).should("be.disabled")
      cy.get("input[name='amount']").type("5")
      cy.findByRole("button", {name: 'Stake'}).click()
    })
    cy.findByText("Transaction confirmed").should("be.visible")
  })

  it("stake renec with max available balance", () => {
    cy.get("header").within(() => {
      cy.findByText("Staking").click()
    })
    cy.get("[data-testid='staking-item']").first().within(() => {
      cy.findByText("Stake").click()
    })
    cy.findByTestId("available-balance").then($element => {
      const availableBalance = $element.text()
      cy.findByText("MAX").click()
      cy.get("input[name='amount']").should("have.value", availableBalance)
      cy.findByRole("button", {name: 'Stake'}).click()
      cy.findByText("Transaction confirmed").should("be.visible")
    })
  })

  it("view my staking list", () => {
    cy.get("header").within(() => {
      cy.findByText("Staking").click()
    })
    cy.findByText("My Staking").click()
    cy.findByText("My staking list").should("be.visible")
    cy.findByTestId("staking-list").should("be.visible")
  })
})
