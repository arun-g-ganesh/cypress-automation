import { login, multicalendar } from '../../support/utilities';
    
describe('Multi Calendar Add Metrics feature', () => {
    const clickAddMetrics = (field) => {
        cy.contains('[id^="popover-trigger-"]', field).click();
    };
    it('MultiCalendar_TC_005 - Validate adding metric and removing the metric', () => {
        //Login
        login();

        //Naivigate to Multicalendar 
        multicalendar();

        //Click Add Metrics
        clickAddMetrics("Add Metric");
        cy.get('#mc-select-metric-box-0').should('be.visible').click();

        //Add Metric
        cy.contains('[id^="popover-trigger-"]', 'Total Revenue').trigger('mouseover');
        cy.get('#select-metric-dfd-revenue--90--1').click();
        cy.get('#mc-select-metric-box-3').should('be.visible').should('have.text', 'Total Revenue Past 90 Days');   
        cy.get('#add-metrics-update-changes-btn').click();

        //Validate the thead
        cy.get('#mc-main table thead th.css-3b5ilu p').should('have.text', 'Total Rev');
        
        //Revert changes
        clickAddMetrics("Add Metric");
        cy.get('svg[data-testid="DeleteIcon"]').should('be.visible').click();
        cy.get('#add-metrics-update-changes-btn').click();

        //Validate thead doesn't exist
        cy.get('#mc-main table thead th.css-3b5ilu p').should('not.exist');
    });
})