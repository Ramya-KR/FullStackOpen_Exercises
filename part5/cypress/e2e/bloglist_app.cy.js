describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      'name': 'Robert C. Martin',
      'username': 'robmar',
      'password': 'romart123'
    }
    const user2 = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.request('POST',`${Cypress.env('BACKEND')}/users`,user2)
    cy.visit('')
  })

  it('Login form is displayed', function () {
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('Log in to application')
      cy.get('#username').type('robmar')
      cy.get('#password').type('romart123')
      cy.get('#submitButton').click()
      cy.contains('Robert C. Martin logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('Log in to application')
      cy.get('#username').type('robmar')
      cy.get('#password').type('romar123')
      cy.get('#submitButton').click()
      cy.get('.errorMessage').contains('wrong credentials, please check')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.visit('')
      cy.login({ username: 'robmar', password:'romart123' })
      cy.createBlog({ title: 'How to write a blog', author: 'Anil Agarwal', url: 'https://ww/jshdee.com' })
    })
    it('A blog can be created', function () {
      cy.contains('add blog').click()
      cy.get('#title').type('10 Things about love')
      cy.get('#author').type('Kiran Yadav')
      cy.get('#url').type('https://www.howtolove.com')
      cy.get('#create-button').click()
      cy.get('.successMessage').contains('Successfully added')
      cy.contains('10 Things about love')
    })

    it('user can like blog', function () {
      cy.contains('add blog').click()
      cy.get('#title').type('10 Things about love')
      cy.get('#author').type('Kiran Yadav')
      cy.get('#url').type('https://www.howtolove.com')
      cy.get('#create-button').click()
      cy.contains('10 Things about love')
      cy.contains('show').click()
      cy.get('#likes').click()
      cy.contains('You have liked')
    })

    it('user can delete blog', function () {
      cy.contains('add blog').click()
      cy.get('#title').type('10 Things about love')
      cy.get('#author').type('Kiran Yadav')
      cy.get('#url').type('https://www.howtolove.com')
      cy.get('#create-button').click()
      cy.contains('10 Things about love')
      cy.contains('show').click()
      cy.get('#deleteButton').click()
      cy.contains('remove').should('exist')
    })
    describe('different user logged in', function () {
      beforeEach(function () {
        cy.login({ username: 'mluukkai', password: 'salainen' })
      })
      it('different user cannot delete blog', function () {
        cy.contains('How to write a blog')
        cy.contains('show').click()
        cy.contains('remove').should('not.contain')
      })
    })
  })
})
