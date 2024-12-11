Cypress.on('uncaught:exception', (err) => {
    if (
        err.message.includes('cross-origin') || 
        err.message.includes('React error #419')
    ) {
        return false; 
    }
});
