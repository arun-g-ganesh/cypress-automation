## Cypress Automation Project
This repository contains automated test scripts written using Cypress for end-to-end testing.

## Folder Structure

cypress-automation/
├── cypress/
│   ├── fixtures/        # Holds static files like JSON used in api tests (json for API tests)
│   ├── e2e/             # Test cases for end-to-end and functional testing (API Spec file, Multicalendar Specs, Manage listing specs)
│   ├── support/         # Custom commands and setup files (e2e.js file to handle exceptions, utilities.js for reusable functions)
│   ├── screenshots/     # Captured screenshots for failing tests
│   └── reports/         # Test reports (generated after running tests)
├── node_modules/        # Project dependencies
├── cypress.config.js    # Cypress configuration file (Base url, reports configurations)
├── cypress.env.json     # Cypress configuration file (Username and Password stored here)
├── package.json         # Project metadata and dependencies
├── README.md            # This file
└── .gitignore           # Git ignore file

## Prerequisites
Before running the tests, ensure that you have the following tools installed on your machine:

Node.js (v12 or later) – Install Node.js
Cypress – The end-to-end testing framework used for automation
Mochawesome – Reporting tool for generating HTML and JSON test reports

## Install Dependencies
To install the required dependencies, run the following commands:

git clone https://github.com/arun-g-ganesh/cypress-automation.git
cd cypress-automation
npm install

## Install Mochawesome
To install Mochawesome for reporting, run the following command:

npm install mochawesome mochawesome-merge mochawesome-report-generator --save-dev
This will install Mochawesome and its necessary utilities.

## Configuring Mochawesome
Once Mochawesome is installed, configure Cypress to use it as the reporter.

## Update cypress.config.js
Add the following configuration to your cypress.json file:

{
  "reporter": "mochawesome",
  "reporterOptions": {
    "reportDir": "cypress/reports",
    "overwrite": false,
    "html": true,
    "json": true
  }
}
This configuration tells Cypress to use Mochawesome as the reporter and store the generated reports in the cypress/reports directory.

## Modify package.json for Report Merging and Generation
To merge the individual JSON reports into a single report and generate an HTML version, modify your package.json file. Add the following script to the scripts section:

"scripts": {
  "test": "cypress run",
  "test:report": "cypress run --reporter mochawesome"
}
The test script runs Cypress tests.

## Running Tests

Cypress allows you to run tests in two modes: the Cypress Test Runner (with GUI) and headless mode (without GUI).

##  Open Cypress Test Runner (GUI Mode)
To open the Cypress Test Runner, run:

npx cypress open
This will open the Cypress Test Runner where you can select and run individual test files located in the cypress/e2e/ directory.

## Run Tests in Headless Mode (CLI Mode)
To run all tests without the GUI (in headless mode), use the following command:

npx cypress run
You can also run specific test files by specifying the path to the test:

npx cypress run --spec "cypress/e2e/test_file.spec.js"

## Generate Mochawesome Reports
Once the tests have run, script will automatically merge the reports and generate the HTML report.

## Test Reports
After running the tests, Cypress generates reports that include screenshots of failed tests and test logs. These can be found in the following directories:

Reports: cypress/reports/ (contains the HTML and JSON test reports)
Screenshots: cypress/screenshots/ (contains screenshots for failed tests)

You can view the detailed Mochawesome HTML report at:

cypress/reports/mochawesome.html

## Example of Report Output

Reports Folder: Contains the merged JSON report and the HTML report.
Screenshots Folder: Contains screenshots for failed tests.

## Configuration

Cypress configuration is stored in cypress.env.json. Customized settings like base URL, timeout durations.

Example:

{
  "baseUrl": "https://example.com",
  "integrationFolder": "cypress/e2e",
  "screenshotsFolder": "cypress/screenshots",
  "videosFolder": "cypress/videos"
}

## Adding Custom Commands
Custom commands and helpers can be added in the cypress/support directory. This allows you to write reusable test helpers or commands for common actions.

## Screenshots and Videos
By default, Cypress captures screenshots for failed tests and saves them in the cypress/screenshots folder. Additionally, Cypress can capture videos of the entire test run, stored in the cypress/videos folder.

## Continuous Integration (Optional)
If you use CI tools like GitHub Actions or Jenkins, you can configure Cypress to run tests automatically on every push or pull request.

## Example of GitHub Actions Workflow
In .github/workflows/cypress.yml, you can configure automated testing on push events.

name: Cypress Tests
on:
  push:
    branches:
      - main
jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2
      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'
      - name: Install dependencies
        run: npm install
      - name: Run Cypress tests
        run: npx cypress run
      - name: Generate Mochawesome report
        run: npm run posttest

## Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes.
Push your changes (git push origin feature-branch).
Open a pull request with a description of your changes.
