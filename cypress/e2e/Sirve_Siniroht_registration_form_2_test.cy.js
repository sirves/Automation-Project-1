beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', ()=>{
        cy.get('#username').type('Roheline')
        cy.get('#email').type('roheline@gmail.com')
        cy.get('[data-cy="name"]').type('Roheline')
        cy.get('#lastName').type('Apelsin')
        cy.get('[data-testid="phoneNumberTestId"]').type('55566888')
        cy.get('#password').type('Nipitiri')
        cy.get('#confirm').type('Nipitiri123')
        cy.get('.submit_button').should('not.be.enabled')
        cy.get('h2').contains('Password').click()
        cy.get('#password_error_message').should('be.visible').and('contain', 'Passwords do not match')
        cy.get('#confirm').clear().type('Nipitiri')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('#password_error_message').should('not.be.visible')
    })
    
    it('User can submit form with all fields added', ()=>{
        cy.get('#username').type('Roheline')
        cy.get('#email').type('roheline@gmail.com')
        cy.get('[data-cy="name"]').type('Roheline')
        cy.get('#lastName').type('Apelsin')
        cy.get('[data-testid="phoneNumberTestId"]').type('55566888')
        cy.get('#htmlFavLanguage').check()
        cy.get('input[type="checkbox"]').check()
        cy.get('#cars').select('volvo')
        cy.get('#animal').select('cat')
        cy.get('#password').type('Nipitiri')
        cy.get('#confirm').type('Nipitiri')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible').and('contain', 'User successfully submitted registration')
    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        cy.get('#username').type('Roheline')
        cy.get('#email').type('roheline@gmail.com')
        cy.get('[data-cy="name"]').type('Roheline')
        cy.get('#lastName').type('Apelsin')
        cy.get('[data-testid="phoneNumberTestId"]').type('55566888')
        cy.get('#password').type('Nipitiri')
        cy.get('#confirm').type('Nipitiri')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible').and('contain', 'User successfully submitted registration')
    })

    it('Submit button is not enabled, when mandatory field email is not filled in', ()=>{
        cy.get('#username').type('Roheline')
        cy.get('[data-cy="name"]').type('Roheline')
        cy.get('#lastName').type('Apelsin')
        cy.get('[data-testid="phoneNumberTestId"]').type('55566888')
        cy.get('#password').type('Nipitiri')
        cy.get('#confirm').type('Nipitiri')
        cy.get('.submit_button').should('be.disabled')
        })

})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        cy.get('img').invoke('height').should('be.lessThan', 178).and('be.greaterThan', 100)   
    })

    it('Check the second picture and its parameters', () => {
        cy.log('Will check logo source and size')
        cy.get('img').eq(1).should('be.visible', 'cypress_logo')
        cy.get('img').invoke('height').should('be.lessThan', 178).and('be.greaterThan', 100)  
    });

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(0).should('be.visible').and('have.attr', 'href', 'registration_form_1.html').click()
        cy.url().should('contain', '/registration_form_1.html')
        cy.go('back')
        cy.log('Back again in registration form 2')
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(1).should('be.visible').and('have.attr', 'href', 'registration_form_3.html').click()
        cy.url().should('contain', '/registration_form_3.html')
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check that radio button list is correct', () => {
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it('Check that checkbox list is correct', () => {
        cy.get('input[type="checkbox"]').should('have.length', 3)
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text','I have a bike')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text','I have a car')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text','I have a boat')
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')
    })

    it('Check that animal dropdown is correct', () => {
        cy.get('#animal').children().should('have.length', 6)
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake')
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo')
        cy.get('#animal').find('option').eq(4).should('have.text', 'Cow')
        cy.get('#animal').find('option').eq(5).should('have.text', 'Horse')
        })
    })

function inputValidData(username) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('MyPass')
    cy.get('h2').contains('Password').click()
}