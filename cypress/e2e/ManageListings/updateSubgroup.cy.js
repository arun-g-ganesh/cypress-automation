import { login, manageListings } from '../../support/utilities';
    
describe('Multi Calendar Row/column update', () => {
    // const clickRowColumn = (index) => {
    //     cy.get('[id^="menu-button-"]').eq(index).should('have.text','Row/Column').click();
    // };
    it('Validate row/column update based on selection', () => {
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

        //Add group and subgroup
        cy.get('button[data-id="group-customization"]').eq(0).should('be.visible').click();
        cy.get('#bs-select-1-9').click();
        cy.get('button[data-id="sub-group-customization"]').eq(0).should('be.visible').click();
        cy.get('#bs-select-11-10').click();
        cy.get('#toast-container').should('contains.text','Customization Sub Group Updated!');

        //Revert changes in listing
        cy.get('button[data-id="group-customization"]').eq(0).click();
        cy.get('#bs-select-1-0').click();
        cy.get('#toast-container').should('contains.text','Customization was removed!');

    });
})