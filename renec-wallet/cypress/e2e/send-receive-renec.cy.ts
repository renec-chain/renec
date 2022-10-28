import "@testing-library/cypress/add-commands"

const unlocked = {
  derivationPath: "bip44Change",
  mnemonic:"roast know quality leisure swallow purse where door into race rally injury maze oven multiply border regular glimpse play tourist athlete shrug hand lawn",
  seed: "9a1cd788b0d68ffcb78f1c1626f7c047f0df1b7d330e937a0905e73fbf215c4bd40a29c584905699ba0f5d44113c33d50d310c580174e3d54288bbeacb62bd15",
}

describe("send/receive renec", () => {
  beforeEach(() => {
    cy.visit("/", {
      onBeforeLoad(window) {
        window.localStorage.setItem("connectionEndpoint", "\"https://api-testnet.renec.foundation:8899\"")
        window.localStorage.setItem('unlocked', JSON.stringify(unlocked))
      }
    })
  })

  it("load wallet success", () => {
    cy.findByText("Main account").should("be.visible")
    cy.findByText("TOTAL BALANCE").should("be.visible")
    cy.findByRole("button", {name: 'Send'}).should("be.visible")
    cy.findByRole("button", {name: 'Receive'}).should("be.visible")
  })

  it('receive renec', () => {
    cy.findByRole("button", {name: 'Receive'}).click()
    cy.findByTestId("deposit-dialog").should("be.visible")
    cy.findByTestId("deposit-dialog").within(() => {
      cy.findByText("Receive RENEC").should("be.visible")
      cy.findByText("Your deposit address:").should("be.visible")
      cy.get("textarea").should('have.value', '6KkM9tktbnrkFKNu3staDFUghwVi8KSNU5fLnyJCsLGw')
      cy.findByText("This address can only be used to receive RENEC and tokens on Remitano Network").should("be.visible")
      cy.findByRole("button", {name: "Copy"}).click()
    })
    cy.findByText("Copied Deposit Address").should("be.visible")
    cy.findByTestId("dialog-close").click()
    cy.findByTestId("deposit-dialog").should("not.exist")
    cy.get("[data-testid~='balance-item']").first().click()
    cy.findByRole("button", {name: 'Request Airdrop'}).click()
    cy.findByText("Success! Please wait up to 30 seconds for the RENEC tokens to appear in your wallet.").should("be.visible")
  })

  it("send renec", () => {
    const destinationWallet = "CFZnojtFpm2yuq5TW5Vgc3y8yZ8uwvnU2cbkA2ZCPaBo";
    cy.findByTestId("send-sql-dialog").should("not.exist")
    cy.findByRole("button", {name: 'Send'}).click()
    cy.findByText("Send Remitano Network Coin (RENEC)").should("be.visible")
    cy.findByTestId("send-sql-dialog").within(() => {
      cy.findByText("Recipient Address").should("be.visible")
      cy.findByText("Amount").should("be.visible")
      cy.findByRole("button", {name: 'Send'}).should("be.disabled")
      cy.get("input[name='recipient-address']").type(destinationWallet)
      cy.get("input[name='amount']").type("10")
      cy.findByRole("button", {name: 'Send'}).click()
    })
    cy.findByText("Transaction confirmed").should("be.visible")
  })

  it("send renec but input invalid address and amount", () => {
    cy.findByRole("button", {name: 'Send'}).click()
    cy.findByTestId("send-sql-dialog").within(() => {
      cy.get("input[name='recipient-address']").type("12345")
      cy.findByText("I'm aware that this address has no funds or this might be an exchange wallet").should("be.visible")
      cy.get("input[name='amount']").type("0")
      cy.findByRole("button", {name: 'Send'}).should("be.disabled")
      cy.get("input[name='amount']").focus().clear()
      cy.get("input[name='amount']").type("0.001")
      cy.findByText("I'm aware that this address has no funds or this might be an exchange wallet").click()
      cy.findByRole("button", {name: 'Send'}).click()
    })
    cy.findByText("Invalid public key input").should("be.visible")
  })

  it("send renec with max total balance", () => {
    const destinationWallet = "CFZnojtFpm2yuq5TW5Vgc3y8yZ8uwvnU2cbkA2ZCPaBo";
    cy.findByRole("button", {name: 'Send'}).click()
    cy.findByTestId("send-sql-dialog").within(() => {
      let availableBalance;
      cy.get("[data-testid='available-balance']").then($element => {
        availableBalance = $element.text()
        cy.findByText("MAX").click()
        cy.get("input[name='recipient-address']").type(destinationWallet)
        cy.get("input[name='amount']").should("have.value", availableBalance)
        cy.findByRole("button", {name: 'Send'}).click()
      })
    })
    cy.findByText("Transaction confirmed").should("be.visible")
  })
})
