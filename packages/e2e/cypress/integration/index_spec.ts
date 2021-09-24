describe('The Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-test="userId"]').first().invoke('text').as('userId')
  })

  it('successfully loads', () => {
    cy.visit('/')
  })

  it('gives each unique user a locally stored id', function () {
    cy.window().then((win) => {
      expect(win.localStorage.getItem('userId')).to.exist
      expect(JSON.parse(win.localStorage.getItem('userId'))).to.eq(this.userId)
    })
  })

  it('can send a message to yourself and have it show up in the ui', function () {
    const userId = this.userId
    cy.intercept('/api/v1/messages/messages').as('sendMessage')

    cy.get('#userId').clear().type(userId)
    cy.get('#text').clear().type('hello me!')
    cy.get('[data-test="form"]').submit()

    cy.wait('@sendMessage').then((intercept) => {
      expect(intercept.request.body.userId).to.eq(userId)
      expect(intercept.request.body.text).to.eq('hello me!')
      expect(intercept.response.body.userId).to.eq(userId)
      expect(intercept.response.body.text).to.eq('hello me!')
      cy.get(`#${intercept.response.body.id}`)
        .should('exist')
        .should('contain.text', 'hello me!')
    })
  })
})
