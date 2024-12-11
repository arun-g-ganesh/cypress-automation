import { login, multicalendar } from '../../support/utilities';
    
describe('Multi Calendar tag feature', () => {
    const clickRowColumn = () => {
        cy.contains('[id^="menu-button-"]', 'Row/Column').click();
    };
    const toggleTagsCheckbox = () => cy.get('label[qa-id="mc-tags-checkbox"]').click();
    it('Validate adding tag and removing the tag', () => {
        //Login
        login();

        //Navigate to Multi Calendar page
        multicalendar();

        //Add Tags to the view
        clickRowColumn(6);
        toggleTagsCheckbox();
        cy.get('label[qa-id="mc-tags-checkbox"]').should('be.visible').should('have.attr', 'data-checked');
        clickRowColumn(6);

        //Add tags 'Test' 
        cy.get('button[qa-id="add-tags-SUNSETPROPS_OLSE___533___vrm"]').should('be.visible').click();
        cy.get('input[qa-id="tag-name-input-SUNSETPROPS_OLSE___533___vrm"]').should('be.visible').type("Test");
        cy.get('button[qa-id="save-tag-SUNSETPROPS_OLSE___533___vrm"]').should('be.visible').click();
        cy.get('#chakra-toast-manager-top-left p').should('be.visible').should('have.text','Tags have been updated!');

        //Verify newly added tag
        cy.get('span[qa-id="tag-SUNSETPROPS_OLSE___533-Test"]').should('be.visible').contains('Test');
        cy.reload();

        //Search with the tag
        cy.get('input[qa-id="mc-search-listings-input"]').should('be.visible').type('Test ').type('{enter}')
        cy.get('span[qa-id="tag-SUNSETPROPS_OLSE___533-Test"]').should('be.visible').contains('Test');

        //Remove tags
        cy.get('svg[data-testid="ClearIcon"]').eq(0).should('be.visible').click();
        cy.get('#chakra-toast-manager-top-left p').should('be.visible').should('have.text','Tags have been updated!');

        //Revert tag from the view
        cy.get('[id^="menu-button-"]').eq(6).should('have.text','Row/Column').click();
        toggleTagsCheckbox();
        cy.get('label[qa-id="mc-tags-checkbox"]').should('be.visible').should('not.have.attr', 'data-checked');
    })
})