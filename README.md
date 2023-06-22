<div align="center">
  <h3>portfolio-e2e-playwright</h3>

  <p>
    Automation testing of the <a href="https://www.saucedemo.com/">Saucedemo</a> website.
  </p>
</div>

<br/>

<h2>Versions:</h2>
• Node JS - 18.16.0
<br/>
• NPM - 9.6.7
<br/>
• Playwright - 1.35.1

<br/>
<br/>

<h2>How to run on your local machine</h2>

Clone this repository:
```
git clone https://github.com/ddpolianskyi/portfolio-e2e-playwright.git
```
Install all requirement dependencies:
```
npm install
```
Install all requirement Playwright browsers (if needed):
```
npx playwright install
```
Run tests:
```
// Run tests in Chrome, Firefox, Safari browsers
npm run test
npm run test:headless

// Run tests in Chrome browser
npm run test:chrome
npm run test:chrome:headless

// Run tests in Firefox browser
npm run test:firefox
npm run test:firefox:headless

// Run tests in Safari browser
npm run test:safari
npm run test:safari:headless
```
Generate and open an Allure HTML report:
```
npm run report
```