/* eslint-disable no-undef */
describe('Blog app', function () {
  const user = {
    name: 'sonya',
    username: 'sonya',
    password: 'sonya'
  }

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.visit('http://localhost:3000')
    cy.contains('blogs')
  })

  it('user can log in', function () {
    cy.get('#username').type('sonya')
    cy.get('#password').type('sonya')
    cy.get('#login-button').click()
    cy.contains('sonya logged-in')
  })

  it('login fails with wrong password', function () {
    cy.get('#username').type('sonya')
    cy.get('#password').type('sonyhja')
    cy.get('#login-button').click()
    cy.get('.error').contains('Wrong credentials')
    cy.get('html').should('not.contain', 'sonya logged-in')

  })

  describe('when logged in', function () {

    beforeEach(function () {
      cy.login({ username: 'sonya', password: 'sonya' })
    })

    it('a new blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('blog by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('url')
      cy.contains('save').click()
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          author: 'blog by cypress',
          title: 'cypress',
          url: 'url'
        })
      })

      it('blog post can be liked', function () {
        cy.contains('View').click()
        cy.contains('like').click()
      })

      it('blog can be deleted', function () {
        cy.contains('View').click()
        cy.contains('delete').click()
        cy.get('html').should('not.contain', 'blog by cypress')
      })
    })
  })
})