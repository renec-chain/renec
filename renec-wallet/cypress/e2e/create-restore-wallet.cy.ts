import "@testing-library/cypress/add-commands"

describe('create-restore wallet', () => {
  let secret = ""

  beforeEach(() => {
    cy.visit('/', {
      onBeforeLoad(window) {
        window.localStorage.setItem("connectionEndpoint", "\"https://api-testnet.renec.foundation:8899\"")
      }
    })
  })

  it('create wallet', () => {
    cy.findByText('Create wallet').click()
    cy.findByText("Please write down your secret key and keep it in a safe place.").should("be.visible")
    cy.findByText("Your secret key are required to restore your wallet in case your devices are damaged or lose access to it. Never share this secret key to any one or it might results in an irreversible loss of your funds.").should("be.visible")
    cy.findByText("Losing a secret key will cause your wallet inaccessible hence losing access to your funds; make sure you store the key safely.").should("be.visible")
    cy.findByText("Click here to view your secret key").click()
    cy.findByTestId("show-secret").should("not.be.exist")
    cy.findByTestId("hide-secret").click()
    cy.findByTestId("show-secret").should("be.visible")
    cy.get('button').contains('Continue').should('be.disabled')
    cy.get('button').contains("Download your secret key as a file (Required)").click()
    cy.findByText("I have written down my secret key and stored it in a safe place.").click()
    cy.get('button').contains('Continue').should('be.enabled')
    cy.get('button').contains('Continue').click()
    cy.findByText("Verification").should('be.visible')
    cy.findByRole('button', {name: 'Verify'}).should('be.disabled')
    cy.get('textarea').type('xxx')
    cy.findByRole('button', {name: 'Verify'}).should('be.disabled')
    cy.findByText('Back').click()
    cy.findByText("Click here to view your secret key").click()
    cy.get("[data-testid='secret-key']")
      .then(($ele) => {
        secret = $ele.text()
        cy.findByRole("button", {name: 'Continue'}).click()
        cy.get('textarea').type(secret)
        cy.findByRole('button', {name: 'Verify'}).should('be.enabled')
        cy.findByRole('button', {name: 'Verify'}).click()
        cy.findByText("Choose a Password (Optional)").should('be.visible')
        cy.findByRole('button', {name: 'Create wallet'}).should('be.enabled')
        cy.get("input[name='password']").type('123456')
        cy.get("input[name='password-confirm']").type('1234567')
        cy.findByRole('button', {name: 'Create wallet'}).should('be.disabled')
        cy.get("input[name='password-confirm']").focus().clear()
        cy.get("input[name='password-confirm']").type('123456')
        cy.findByRole('button', {name: 'Create wallet'}).click()
        cy.findByText("Wallet created").should('be.visible')
      })
  })

  it('restore wallet', () => {
    cy.findByText('Restore wallet').click()
    cy.findByText('Restore Existing Wallet').should("be.visible")
    cy.get('button').contains('Continue').should('be.disabled')
    cy.get('textarea').type("xxx")
    cy.get('button').contains('Continue').should('be.disabled')
    cy.findByText("Mnemonic validation failed. Please enter a valid BIP 39 seed phrase.").should('be.visible')
    cy.get('textarea').focus().clear()
    cy.get('textarea').type(secret)
    cy.findByText("Mnemonic validation failed. Please enter a valid BIP 39 seed phrase.").should('not.exist')
    cy.get('button').contains('Continue').should('be.enabled')
    cy.get("input[name='password']").type("Aa@123456")
    cy.get("input[name='password-confirm']").type("Aa@1234567")
    cy.get('button').contains('Continue').should('be.disabled')
    cy.get("input[name='password-confirm']").focus().clear()
    cy.get("input[name='password-confirm']").type("Aa@123456")
    cy.get('button').contains('Continue').click()
    cy.findByText(/restore/i).click()
    cy.findByText("Success").should('be.visible')
  })
})
