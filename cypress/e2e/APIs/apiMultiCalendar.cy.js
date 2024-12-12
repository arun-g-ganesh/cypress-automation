import { login, getCurrentDateParameter } from '../../support/utilities';
    
describe('API tests in Multi Calendar Page', () => {
    it('API_TC_001 - Validate Search listings API', () => {
        //Login
        login();
        let currentDate = getCurrentDateParameter();
        let startDate = 'startDate=' + currentDate
        cy.fixture('cookie.json').then((cookie) => {
            cy.setCookie('_p_session', cookie.cookieValue);
            cy.fixture('listingFilter').then((listingFilter) => {
                const queryString = Object.entries(listingFilter)
                    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                    .join('&');
                cy.request({
                    method: 'GET',
                    url: `https://app.pricelabs.co/api/listings?${startDate}&${queryString}`,
                }).then((response) => {
                    expect(response.body.message).to.eq('SUCCESS');
                });
            }) 
        });
    });
    it('API_TC_002 - Validate Sync now request and response', () => {
        cy.fixture('cookie.json').then((cookie) => {
            cy.setCookie('_p_session', cookie.cookieValue);
            cy.fixture('syncNow').then((syncNow) => {
                const queryString = Object.entries(syncNow)
                    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                    .join('&');
                cy.request({
                    method: 'POST',
                    url: `https://app.pricelabs.co/api/push_price_status`,
                    body: syncNow,
                }).then((response) => {
                    expect(response.body.message).to.eq('SUCCESS');
                });
            }) 
        });
    });
    it('API_TC_003 - Validate fetching bulk listings', () => {
        cy.fixture('cookie.json').then((cookie) => {
            cy.setCookie('_p_session', cookie.cookieValue);
            cy.fixture('bulkNotes').then((bulkNotes) => {
                const queryString = Object.entries(bulkNotes)
                    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                    .join('&');
                cy.request({
                    method: 'POST',
                    url: `https://app.pricelabs.co/api/fetch_bulk_notes`,
                    body: bulkNotes,
                }).then((response) => {
                    expect(response.body.message).to.eq('SUCCESS');
                });
            }) 
        });
    });
})