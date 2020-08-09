describe('App', () => {
  describe('when API responses are successful', () => {
    beforeEach(() => {
      cy.fixture('listUsers-page-1-200.json').as('getListUsers200')
      
      cy.server()

      cy.route({
        method: 'post',
        url: 'graphql',
        status: 200,
        response: '@getListUsers200',
      }).as('getListUsersSuccess')

      cy.visit('/')
    })

    it('it successfully loads the elements on the page', () => {
      cy.get('h1')
        .should('contain', 'Users List')
      cy.get('.SearchInput')
        .should('exist')
      cy.get('.Card')
        .should('have.length', 6)
      cy.get('button')
        .should('contain', 'Load More...')
    })

    it('it successfully loads more cards on button click', () => {
      cy.fixture('listUsers-page-2-200.json').as('getListUsers200')

      cy.get('.Card')
        .should('have.length', 6)
      cy.get('button')
        .should('contain', 'Load More...')
        .click()

      cy.route({
        method: 'post',
        url: 'graphql',
        status: 200,
        response: '@getListUsers200',
      }).as('getListUsersSuccess')

      cy.wait(['@getListUsersSuccess'])

      cy.get('.Card')
        .should('have.length', 12)
    })

    it('it should return the correct results when searching', () => {
      cy.fixture('listUsers-search-page-1-200.json').as('getListUsersSearch200')

      cy.get('.SearchInput')
        .should('exist')
        .type('Bradley')
        .type('{enter}')

      cy.route({
          method: 'post',
          url: 'graphql',
          status: 200,
          response: '@getListUsersSearch200',
        }).as('getListUsersSearchSuccess')

      cy.wait(['@getListUsersSearchSuccess'])

      cy.get('.Card')
        .should('have.length', 1)
        .should('contain', "Bradley Huntington Jr")
    })

    it('it should return the correct results when clearing the search input', () => {
      cy.fixture('listUsers-search-page-1-200.json').as('getListUsersSearch200')
      cy.fixture('listUsers-page-1-200.json').as('getListUsers200')

      cy.get('.SearchInput')
        .should('exist')
        .type('Bradley')
        .type('{enter}')

      cy.route({
          method: 'post',
          url: 'graphql',
          status: 200,
          response: '@getListUsersSearch200',
        }).as('getListUsersSearchSuccess')

      cy.wait(['@getListUsersSearchSuccess'])

      cy.get('.Card')
        .should('have.length', 1)
        .should('contain', "Bradley Huntington Jr")

      cy.get('.SearchInput')
        .should('exist')
        .clear()
        .type('{enter}')

      cy.route({
        method: 'post',
        url: 'graphql',
        status: 200,
        response: '@getListUsers200',
      }).as('getListUsersSuccess')

      cy.wait(['@getListUsersSuccess'])

      cy.get('.Card')
      .should('have.length', 6)
    })


    it('it should open a card when a card is clicked', () => {      
      cy.get('.Card')
        .should('have.length', 6)
      cy.get('.Card')
        .first()
        .click()
      cy.get('.ReactModal__Content')
        .should('exist')
    })

    it('it should render edit user modal elements', () => {
      cy.get('.Card')
        .should('have.length', 6)
      cy.get('.Card')
        .first()
        .click()
      cy.get('.ReactModal__Content')
        .should('exist')
      cy.get('.ReactModal__Content > h1')
        .should('contain', 'Edit user')
      cy.get('.Edit-map')
        .should('exist')
      cy.get('form > [name="name"]')
        .should('have.value', 'Sarah Johansburg')
      cy.get('form > [name="address"]')
        .should('have.value', '148 Central Ave, New York, NY')
      cy.get('form > [name="description"]')
        .should('have.value', 'This is a good day to die. Kaplah!')
      cy.get('[type="submit"]')
        .should('contain', 'Save')
      cy.get('.Edit-modal-actions > :nth-child(2)')
        .should('contain', 'Cancel')
    })

    it('it should close edit user modal on cancel without submitting', () => {
      cy.get('.Card')
        .should('have.length', 6)
      cy.get('.Card')
        .first()
        .click()
      cy.get('.ReactModal__Content')
        .should('exist')
      cy.get('.Edit-modal-actions > :nth-child(2)')
        .should('contain', 'Cancel')
    })

    it('it should update user name and close edit user modal on save', () => {
      cy.fixture('listUsers-edited-page-1-200.json').as('getListUsersEdited200')
     
      cy.get('.Card')
        .should('have.length', 6)
      cy.get('.Card-list > :nth-child(2)')
        .click()
      cy.get('.ReactModal__Content')
        .should('exist')
      cy.get('form > [name="name"]')
        .should('have.value', 'Usaf Khalif')
        .clear()
        .type('Usaf Khalif Jr')

      cy.get('[type="submit"]')
        .click()

      cy.route({
        method: 'post',
        url: 'graphql',
        status: 200,
        response: '@getListUsersEdited200',
      }).as('getListUsersEditedSuccess')

      cy.visit('/')

      cy.wait(['@getListUsersEditedSuccess'])

      cy.get('.Card')
        .should('have.length', 6)
      cy.get('.Card-list > :nth-child(2)')
        .click()
      cy.get('.ReactModal__Content')
        .should('exist')
      cy.get('form > [name="name"]')
        .should('have.value', 'Usaf Khalif Jr')
    })

  })

  describe('when API responses are unsuccessful', () => {
    beforeEach(() => {     
      cy.server()

      cy.route({
        method: 'post',
        url: 'graphql',
        status: 500,
        response: [],
      }).as('getListUsersFailure')

      cy.visit('/')
    })

    it('it successfully loads the elements on the page', () => {
      cy.get('h1')
        .should('contain', 'Users List')
      cy.get('.SearchInput')
        .should('exist')
      cy.get('.Card-list > p')
        .should('contain', 'No results found')
    })
  })
})
