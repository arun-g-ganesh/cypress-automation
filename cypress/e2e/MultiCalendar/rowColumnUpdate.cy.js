import { login, multicalendar } from '../../support/utilities';
    
describe('Multi Calendar Row/column update', () => {
    const clickRowColumn = (index) => {
        cy.get('[id^="menu-button-"]').eq(index).should('have.text','Row/Column').click();
    };
    it('Validate row/column update based on selection', () => {
        //Login
        login();

        //Navigate to Multi Calendar page
        multicalendar();

        //Add Min Price 
        clickRowColumn(6);
        cy.get('label[qa-id="mc-minPrice-checkbox"]').should('be.visible').click();
        cy.get('label[qa-id="mc-minPrice-checkbox"]').should('be.visible').should('have.attr', 'data-checked');
        clickRowColumn(6);
        cy.get('#mc-main table thead th:nth-child(4) div p').should('be.visible').should('have.text', 'Min');

        //Reverting changes
        clickRowColumn(6);
        cy.get('label[qa-id="mc-minPrice-checkbox"]').click();  
        cy.get('label[qa-id="mc-minPrice-checkbox"]').should('be.visible').should('not.have.attr', 'data-checked');
    });

});