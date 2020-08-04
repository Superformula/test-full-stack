# Superformula Full Stack Developer Test

## My Solution

Project was built with CRA for the frontend and AWS AppSync for the backend.

The project is live at: https://rodrigo.d1fkwqzove8rxw.amplifyapp.com/

If you want to run the code locally, fell free to:

- clone the repo
- `yarn install`
- `yarn start`

## Design

The backend architecture is managed and deployed with AWS AppSync. A GraphQL API sits a top a DynamoDB instance that persists the user data. It is easily extensible and quick to redeploy/scale.

The frontend was built with React with Create React App facilititaing the tooling. The project is structured in the following manner:

- components: Contains functional component implementations that are meant to be easily extensible. Each component has its own CSS companion file for ease of styling.
- features: Contains integrations of the basic components to provide more complex interactions.
- graphql: Contains queries, mutations, and subscriptions that match the AppSync service. Easy to regenrate in case of a schema change through a simple script.
- utilities: Contains helper methods and more complex scripts whose main goal is to facilitate the flow of the application
- views: Contains the layouts that will be rendered on screen and act as the parents to a combination of features and components.
- Finally, the index file contains the entry point which loads the necessary connectors/links to AppSync and instantiates the GraphQL client for the frontend.

## Implementation

### Backend Context

#### Goals

- [x] The API should follow typical GraphQL API design pattern.
- [x] The data should be saved in the DB.
  - DynamoDB is used
- [x] Proper error handling should be used.
  - Implemented some error handling but the application needs more coverage
- [x] Paginating and filtering (by name) users list
  - Need to discuss filtering behavior with product owner to make sure the current behavior is the expected one.
- [x] Use AWS AppSync (preferred) or AWS Lambda + API Gateway approach
  - AppSync was used
- [x] Use any AWS Database-as-a-Service persistence store. DynamoDB is preferred.
  - DynamoDB used as requested
- [ ] Add a Query to fetch location information based off the user's address (use [NASA](https://api.nasa.gov/api.html) or [Mapbox](https://www.mapbox.com/api-documentation/) APIs); use AWS Lambda
  - Used a fetch call to retrieve information instead of Lambda.
  - Need more details as to what to do with it (add landmarks, poi, etc. on map)
- [x] Write concise and clear commit messages.
- [x] Write clear **documentation** on how it has been designed and how to run the code.
  - See design section
- [x] Use Infrastructure-as-code tooling that can be used to deploy all resources to an AWS account.
  - AWS Amplify used to deploy both the front end and backend.
- [ ] Provide proper unit tests.
- [x] Providing an online demo is welcomed, but not required.
- [ ] Bundle npm modules into your Lambdas
- [ ] Describe your strategy for Lambda error handling, retries, and DLQs
- [x] Describe your cloud-native logging, monitoring, and alarming strategy across all queries/mutations
  - Logging and monitoring provided by AWS AppSync: https://console.aws.amazon.com/appsync/home?region=us-east-1#/yf56pgs6y5hhxcmdgf7w75dmqa/v1/monitoring
  - In a production scenario, we would need more actionable monitoring

## UI context

#### Goals

- [x] The search functionality should perform real time filtering on client side data and API side data
- [x] List of users should be updated automatically after single user is updated
  - AppSync and subscription link help me manage this functionality.
- [x] Infinite loading state should be saved in url query
  - I'm new to the graphql world, but I am saving my cursor in between pagination calls. I think this complies with the requirement.
- [x] Appear/Disappear of modal should be animated (feel free with choose how)
  - Simple fadein/fadeout animations implemented
- [x] Map with user location should update async when user changes "location" field
- [x] JS oriented (Typescript preferred)
  - JS for simplicity (time)
- [x] Use **React**, **Angular** or **VUE**.
  - Used React
- [x] Use unsplash.com to show random avatar images
- [x] You don't have to write configuration from scratch (you can use eg. CRA for React application)
  - Used CRA
- [] Feel free to use a preprocessor like SASS/SCSS/Less or CSS in JS
- [] Provide E2E and unit tests
- [x] Feel free to choose MAPS service (GoogleMaps, OpenStreetMap etc)
- [x] Please **do not** use any additional libraries with predefined styles like `react-bootstrap`, `material-ui` etc.
- [x] Write clear **documentation** on how the app was designed and how to run the code.
  - See design section
- [] Provide components in [Storybook](https://storybook.js.org) with tests.
  - Chose to leave this as a TODO given time.
- [x] Write concise and clear commit messages.
  - I tried but had few monsters in there.
- [x] Provide an online demo of the application.
  - The project is live at: https://rodrigo.d1fkwqzove8rxw.amplifyapp.com
- [x] Include subtle animations to focus attention
  - UserCards on hover animations
- [] Describe optimization opportunities when you conclude
  - Create a form component to improve state management
  - Refactor picture fetching isn't ideal as state is deeply propagated
  - Upgrade graphql dependencies to streamline code
  - In a real life application, my user management never discards any users which could potentially lead to a memory crash. Implementing backwards pagination would aleviate this scenario.
- [x] Handle server errors
  - In case no users data is present, error mesage are shown to user
- [x] Handle loading states
  - Used react-loader-spinner to handle loading states.
