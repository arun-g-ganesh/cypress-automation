import { login, manageListings } from '../../support/utilities';
    
describe('Multi Calendar Row/column update', () => {
    // const clickRowColumn = (index) => {
    //     cy.get('[id^="menu-button-"]').eq(index).should('have.text','Row/Column').click();
    // };
    it('ManageListings_TC_002 - Update room count for a listing that has no assigned group', () => {
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

        //Navigate to mapped listings
        cy.get('a[data-name="mapped_listings"]').should('be.visible').click();
        cy.get('.edit-bedroom-icon').eq(0).scrollIntoView().click();
        cy.get('div.br-count-dropdown > ul > li:nth-child(2)').click();
        cy.get('bedroom-count-submit-dropdown').click();
        cy.get('#toast-container').should('contain.text','Your bedroom count is set to 1 BR');

        //Revert changes
        cy.get('.edit-bedroom-icon').eq(0).scrollIntoView().click();
        cy.get('div.br-count-dropdown > ul > li:nth-child(1)').click();
        cy.get('bedroom-count-submit-dropdown').click();
        cy.get('#toast-container').should('contain.text','Your bedroom count is set to 2 BR');
    });
})