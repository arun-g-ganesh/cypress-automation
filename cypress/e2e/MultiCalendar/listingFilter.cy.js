import { login, multicalendar } from '../../support/utilities';
    
describe('Multi Calendar Listing Filter', () => {
    const clickListingFilter = () => {
        cy.get('#mc-filters-btn').should('have.text', 'Listing Filter').click();
    };
    it('MultiCalendar_TC_003 - Validate Listing filter option', () => {
        //Login
        login();

        //Naivigate to Multicalendar 
        multicalendar();

        //Apply Total Occupancy past 60 days filter
        clickListingFilter();
        cy.contains('Total Occupancy').trigger('mouseover');
        cy.get('#metric-dfd-text-occupancy_-60').click();
        cy.get('[id^="field-"]').eq(0).should('be.visible').should('include.text','Select').select('Less than or equal to');
        cy.get('[id^="field-"]').eq(1).should('be.visible').should('have.attr', 'placeholder', 'value').type('50');
        cy.get('#mc-listing-filter-show-listings').click();

        //Reverting Filter
        cy.get('#mc-filters-btn').should('have.text', 'Listing Filter1').click();
        cy.get('#mc-listing-filter-clear').click();
        cy.get('#mc-listing-filter-show-listings').click();
    });
});