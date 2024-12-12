import { login, manageListings } from '../../support/utilities';
    
describe('Multi Calendar Row/column update', () => {
    // const clickRowColumn = (index) => {
    //     cy.get('[id^="menu-button-"]').eq(index).should('have.text','Row/Column').click();
    // };
    it('ManageListings_TC_001 - Update base price for a listing that has no assigned group', () => {
        //Login
        login();

        //Navigate to Multi Calendar page
        manageListings();

        //Add Listing Filter
        cy.get('div[qa-id="filter-select-dropdown"]').should('be.visible').click();
        cy.get('li[data-property="groups"]').should('be.visible').click();
        cy.get('button[title="Nothing selected"]').should('be.visible').click();
        cy.get('#bs-select-7-0').click();
        cy.get('h3[qa-id="filter-modal-title"]').click();
        cy.get('#apply-filter').click();

        cy.get('input[name="base_price"]').eq(0).should('be.visible').type('1000').type('{enter}')
        cy.get('input[name="base_price"]').eq(0).scrollIntoView();
        cy.get('#toast-container').should('contain.text','Base price -- updated: 1000');

        cy.get('input[name="base_price"]').eq(0).should('be.visible').type('{backspace}'.repeat(4)).type('{enter}')
        cy.get('input[name="base_price"]').eq(0).scrollIntoView();
        cy.get('#toast-container').should('contain.text','Base price -- updated:');
    });
})