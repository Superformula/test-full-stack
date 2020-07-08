# Superformula Full Stack Developer Test

Be sure to read **all** of this document carefully, and follow the guidelines within.

## Backend Context

Build a GraphQL API that can `create/read/update/delete` user data from a persistence store.

### User Model

```
{
  "id": "xxx",                  // user ID (must be unique)
  "name": "backend test",       // user name
  "dob": "",                    // date of birth
  "address": "",                // user address
  "description": "",            // user description
  "createdAt": ""               // user created date
  "updatedAt": ""               // user updated date
}
```

### Functionality

- The API should follow typical GraphQL API design pattern.
- The data should be saved in the DB.
- Proper error handling should be used.
- Paginating and filtering (by name) users list

### Basic Requirements

  - Use AWS AppSync (preferred) or AWS Lambda + API Gateway approach
  - Use any AWS Database-as-a-Service persistence store. DynamoDB is preferred.
  - Add a Query to fetch location information based off the user's address (use [NASA](https://api.nasa.gov/api.html) or [Mapbox](https://www.mapbox.com/api-documentation/) APIs); use AWS Lambda
  - Write concise and clear commit messages.
  - Write clear **documentation** on how it has been designed and how to run the code.

### Bonus
  - Use Infrastructure-as-code tooling that can be used to deploy all resources to an AWS account. Examples: CloudFormation / SAM, Terraform, Serverless Framework, etc.
  - Provide proper unit tests.
  - Providing an online demo is welcomed, but not required.
  - Bundle npm modules into your Lambdas

### Advanced Requirements

These may be used for further challenges. You can freely skip these; feel free to try out if you feel up to it.
  - Describe your strategy for Lambda error handling, retries, and DLQs
  - Describe your cloud-native logging, monitoring, and alarming strategy across all queries/mutations

## UI context

Use HTML, CSS, and JavaScript (choose one of popular framework) to implement the following mock-up. You are only required to complete the desktop views, unless otherwise instructed. Application should connect to created GraphQL API.

![Superformula-front-end-test-mockup](./mockup1.png)

![Superformula-front-end-test-mockup-2](./mockup2.png)

> [Source Figma file](https://www.figma.com/file/hd7EgdTxJs2fpTzzSKlNxo/Superformula-full-stack-test)

## Requirements

### Functionality

- The search functionality should perform real time filtering on client side data and API side data
- List of users should be updated automatically after single user is updated
- Infinite loading state should be saved in url query
- Appear/Disappear of modal should be animated (feel free with choose how)
- Map with user location should update async - when user changes "location" field

### Tech stack

- JS oriented (Typescript preferred)
- Use **React**, **Angular** or **VUE**.
- Use unsplash.com to show random avatar images
- You don't have to write configuration from scratch (you can use eg. CRA for React application)
- Feel free to use a preprocessor like SASS/SCSS/Less or CSS in JS
- Provide E2E and unit tests
- Feel free to choose MAPS service (GoogleMaps, OpenStreetMap etc)
- Please **do not** use any additional libraries with predefined styles like `react-bootstrap`, `material-ui` etc.

### Bonus

- Write clear **documentation** on how the app was designed and how to run the code.
- Provide components in [Storybook](https://storybook.js.org) with tests.
- Write concise and clear commit messages.
- Provide an online demo of the application.
- Include subtle animations to focus attention
- Describe optimization opportunities when you conclude
- Handle server errors
- Handle loading states

## What We Care About

Use any libraries that you would normally use if this were a real production App. Please note: we're interested in your code & the way you solve the problem, not how well you can use a particular library or feature.

_We're interested in your method and how you approach the problem just as much as we're interested in the end result._

Here's what you should strive for:

- Good use of current HTML, CSS, JavaScript, Node.js & performance best practices.
- Solid testing approach.
- Extensible code.

## Q&A

> Where should I send back the result when I'm done?

Fork this repo and send us a pull request when you think you are done. There is no deadline for this task unless otherwise noted to you directly.

> What if I have a question?

Create a new issue in this repo and we will respond and get back to you quickly.