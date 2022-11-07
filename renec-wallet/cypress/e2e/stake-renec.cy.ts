import "@testing-library/cypress/add-commands"

const unlocked = {
  derivationPath: "bip44Change",
  mnemonic:"use beef own chapter cheese curve kangaroo pride barely uphold sad wine silver quarter valid energy snap rate share pave caution slab fall person",
  seed: "5b2666547209aedf3ddc727f9f06e2fc8a70de41ee323965d02e0bfaa82a00cdce1a8116b294f02ffca71212c410c049836693c39a7cd7e1b4b4d3baafa63a1a",
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
    cy.get("header").within(() => {
      cy.findByText("Staking").click()
    })
    cy.findByText("Validators staking list").should("be.visible")
    cy.get("[data-testid='staking-item']").first().within(() => {
      cy.findByText("Stake").click()
    })
    cy.findByTestId("create-staking-dialog").within(() => {
      cy.findByRole("button", {name: 'Stake'}).should("be.disabled")
      cy.get("input[name='amount']").type('0.001')
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
    })
  })

  it("view my staking list",  () => {
    cy.get("header").within(() => {
      cy.findByText("Staking").click()
    })
    cy.findByText("My Staking").click()
    cy.findByText("My staking list").should("be.visible")
    cy.findByTestId("staking-list").should("be.visible")
    // undelegate and withdraw
    cy.get(".my-staking-item").first().within(() => {
      cy.findByText("Activating").should("be.visible")
      cy.findByText("Click to expand").click();
      cy.findByText( 'Undelegate').click()
    })
    cy.findByTestId("confirm-undelegate-dialog").within(() => {
      cy.findByText("Confirm Undelegate").should("be.visible")
      cy.findByText("Undelegate could take several days to be successful, you can still receive commission during the waiting period. Do you want to undelegate this stake?")
      cy.findByText("Ok").click()
    })
    // wait for undelegate success to do next steps
    cy.wait(5000)
    cy.get(".my-staking-item").first().within(() => {
      cy.findByText("Click to expand").click();
      cy.findByText( 'Withdraw').click()
    })
    cy.findByText("Transaction confirmed").should("be.visible")
    cy.get(".my-staking-item").should("not.exist")
  })
})
