import { login, multicalendar } from '../../support/utilities';
    
describe('Multi Calendar bulk update', () => {
    it('MultiCalendar_TC_006 - Validate error message while trying to do bulk update on listings that needs save & refresh action', () => {
        //Login
        login();

        //Naivigate to Multicalendar 
        multicalendar();

        //Click multiple listings
        cy.get('label[qa-id="bulk-SUNSETPROPS_OLSE___533___vrm"]').click();
        cy.get('label[qa-id="bulk-VRMREALTY___110___vrm"]').click();

        cy.contains('Apply Override').click();

        //Validate the error message popup
        cy.get('#chakra-toast-manager-top-left > div:first-child p').should('be.visible').should('have.text', 'Some listings need Save & Refresh before setting an override.');
        cy.reload();
    });
})