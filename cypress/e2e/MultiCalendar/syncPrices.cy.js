import { login } from '../support/login';
import { multicalendar } from '../support/multiCalendar';
    
describe('Multi Calendar Sync now feature', () => {
    it('Validate sync now alert message when toggle is turned on and turned off', () => {
        //Login
        login();

        //Navigate to Multi Calendar page
        multicalendar();

        // Type into the search field and press enter
        cy.get('input[qa-id="mc-search-listings-input"]').type('aaaaa').type('{enter}')
        cy.wait(2000);

        cy.get('#mc-main span span').should('be.visible').click(); 

        // Check for the toast notification message
        cy.get('#chakra-toast-manager-top-left p').should('be.visible').should('contain.text', 'Your prices are scheduled to be updated overnight.')
        
        // Click again to trigger the next toast message
        cy.get('#mc-main span span').should('be.visible').click(); 
        cy.get('#chakra-toast-manager-top-left p > div').should('be.visible').should('contain.text', 'We have stopped updating your prices.')  

        // Toggle logic based on the 'data-checked' attribute
        cy.get('#chakra-toast-manager-top-left p > div').then(($syncnow) => {
            const isChecked = $syncnow.attr('data-checked'); 
          
            if (isChecked) {
              cy.wrap($syncnow).click(); 
            } else {
              cy.log('Toggle is already off, not clicking');
            }
          });
    });
});