# Telnyx WebdriverIO Testing Plan

This project contains an automated **End-to-End (E2E)** test suite for the **Telnyx** website,
built using **WebdriverIO** with a clean and scalable **Page Object Model (POM)** architecture.

The project covers the following Telnyx platforms:
- **Main website** — https://telnyx.com  
- **Customer portal (login)** — https://portal.telnyx.com  
- **Shop** — https://shop.telnyx.com  

The test suite supports:
- **Multiple browsers** (Chrome, Firefox, Edge)
- **Multiple locales** (EN / FR / DE)
- **Dockerized execution**
- **Allure reporting**
- **CI/CD via GitHub Actions with GitHub Pages deployment**

The Page Object Model (POM) pattern is used throughout the project to ensure maintainability,
readability, and reusability of test code.

## Allure Test Report

The latest Allure test report is automatically generated in CI and published via **GitHub Pages**.

### Live Allure Report: 
https://olenashtronda.github.io/telnyx_webdriverio_testing_plan/

## Prerequisites
- Node.js **v20+**
- npm
- Docker (optional, for containerized execution)
- Java (required only for generating Allure reports locally)

## Installation

```
npm ci
```

## Project Structure

```
.
├── .github/
│   └── workflows/
│       └── webdriverio.yml
│
├── config/
│   └── environments.js
│
├── docker/
│   ├── Dockerfile
│   └── docker-compose.yml
│
├── test/
│   ├── fixtures/
│   │   ├── homeTestData.de.json
│   │   ├── homeTestData.en.json
│   │   ├── homeTestData.fr.json
│   │   └── shopTestData.json
│   │
│   ├── pageobjects/
│   │   ├── BasePage.js
│   │   ├── ContactUsPage.js
│   │   ├── HomePage.js
│   │   ├── LoginPage.js
│   │   ├── ShopPage.js
│   │   └── SignupPage.js
│   │
│   └── specs/
│       ├── contactUs.spec.js
│       ├── homepage.spec.js
│       ├── login.spec.js
│       ├── shop.spec.js
│       ├── signup.spec.js
│       └── textToSpeechTab.spec.js
│
├── .gitignore
├── README.md
├── package-lock.json
├── package.json
├── wdio.base.conf.js
├── wdio.chrome.conf.js
├── wdio.edge.conf.js
├── wdio.firefox.conf.js
└── wdio.multibrowser.conf.js
```

## Environments & Localization

Environment-specific settings are defined in `config/environments.js` and selected via `ENV`.

Available environments:
- `prodEn` — English
- `prodFr` — French
- `prodDe` — German

Each environment provides:
- `baseUrl`
- `language`
- `testDataFile` (used dynamically in tests via WDIO params)

This allows the same tests to run against different locales without code duplication.

## Fixtures

The project uses JSON fixtures for data-driven testing.

Fixtures are located in: `test/fixtures/`

Included files:
- `homeTestData.en.json` — Text-to-Speech data (EN)
- `homeTestData.fr.json` — Text-to-Speech data (FR)
- `homeTestData.de.json` — Text-to-Speech data (DE)
- `shopTestData.json` — products, search terms, currencies

Fixtures are loaded dynamically in tests using WDIO parameters.

## Running Tests

Run all tests (all browsers & all locales)

```
npm run test:all
```

Run tests for a specific browser

```
npm run test:chrome
npm run test:firefox
npm run test:edge
```

Run a single spec file

```
npm run test:spec:chrome --spec homepage.spec.js
```

## Docker Execution

The project supports fully containerized execution using Selenium standalone images.

Run all tests with Docker

```
docker compose up --build
```

This will:
- Start Selenium containers (Chrome, Firefox, Edge)
- Run all tests inside the test container
- Persist Allure results to `docker/allure-results`

Run specific browser in Docker

```
npm run test:docker:chrome
npm run test:docker:firefox
npm run test:docker:edge
```

## Allure Reporting

Generate report locally

```
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

## CI Reports
- Allure reports are generated automatically in GitHub Actions
- Reports are deployed to GitHub Pages
- Test history is preserved between runs

## Test Coverage

### Homepage Tests
- Voice Network heading visibility
- Switching between:
  - Text to Speech
  - Speech to Text
  - HD Voice AI
- Navigation to Contact Us page

### Text-to-Speech Tests
- Default state validation
- Dropdown interactions (Voice, Language, Role, Speed)
- Text persistence across changes
- Reset to default state after reload
- Data-driven validation per locale

### Login Tests
- Required fields and labels
- Invalid email validation
- Login button state

### Contact Us Tests
- Required fields visibility
- Submit button enabled state

### Sign-up Tests
- Required fields and checkboxes
- Promo code field hidden by default
- Promo code field revealed with correct labels

### Shop Tests
- Product search (data-driven)
- Cart empty state
- Add/remove product flow
- Currency switching and price validation

## Page Object Model

Each page object contains:
- Selectors — element locators
- Actions — user interactions
- Assertions — state verification

## Best Practices
- Tests are independent and order-agnostic
- Page objects are reused across test suites
- Assertions are separated from actions
- Environment and locale logic is centralized
- CI continues execution even if some tests fail

## CI/CD Integration

The project includes a GitHub Actions workflow that:
1. Runs tests for Chrome, Firefox, and Edge
2. Executes all locales (EN / FR / DE)
3. Generates an Allure report
4. Deploys the report to GitHub Pages

The workflow is triggered on every push to `main`.

## License

ISC
