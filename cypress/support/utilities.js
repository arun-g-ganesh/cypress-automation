export const login = () => {
    const username = Cypress.env('username');
    const password = Cypress.env('password');
    cy.visit('/signin');
    cy.get('#user_email').type(username);
    cy.get('#password-field').type(password);
    cy.get('input[type="Submit"]').click();
    cy.getCookie('_p_session').then((cookie) => {
        cy.log(cookie);
        cy.writeFile('cypress/fixtures/cookie.json', { cookieValue: cookie.value });
    });
    cy.url().should('include', '/multicalendar');
};

export const multicalendar = () => {

    cy.get('a[qa-id="nav-item-title"]').click();
    cy.get('h4[qa-id="dropdown-value-mcp-v2"]').click();
    cy.url().should('include', '/multicalendar');
    cy.get('button[qa-id="mc-default-landing-page-no-button"]').should('be.visible').click();

};

export const manageListings = () => {

    cy.get('a[qa-id="nav-item-title"]').click();
    cy.get('h4[qa-id="dropdown-value-mlp"]').click();
    cy.url().should('include', '/mappings');
    cy.get('div.col-md-3 h2').should('be.visible').should('have.text', 'Manage Listings')

};

// cypress/utils/dateUtils.js
export const getCurrentDateParameter = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    
    // Return the parameter in the desired format, e.g., YYYY-MM-DD
    return `${year}-${month}-${day}`;
};

