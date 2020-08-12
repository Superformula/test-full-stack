# Superformula Developer Test (v1.1.0)

This project is for a full stack developer take home test. The live demo can be found at [https://master.d1murkhtb2ui4y.amplifyapp.com/](https://master.d1murkhtb2ui4y.amplifyapp.com/)

## Highlights

- Uses AWS Amplify for hosting, CI/CD and logging
- Uses AWS AppSync for GraphQL API
- Uses DynamoDB storage
- Uses Mapbox API (currently direct query)
- Uses CRA
- Uses Typescript
- Uses SASS

## Project Status

- [x] The search functionality performs real time filtering: API side data
- [ ] The search functionality performs real time filtering: client side data
- [x] List of users updates automatically after single user is updated
- [x] Appear/Disappear of modal is animated via CSS
- [x] Map with user location updates async - when user changes "location" field
- [ ] Unit Tests (not doing most likely, see Testing note below)

## Installation

In the project directory, you can run:

- `yarn install` this will install all required packages for development and/or deployment

## Development

In the project directory, you can run:

- `yarn start`. Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- `yarn test` Launches the test runner in the interactive watch mode.
- `npm run cypress` Launches the e2e cypress testing suite.
- `yarn build` Builds the app for production to the `build` folder.

## Deployment
 
Utilizing AWS tooling, this is easily deployed using AWS Amplify to host the frontend and backend to include the API.

1. Ensure you've followed the installation sections instructions above.
2. Ensure you've set up your AWS account and settings. These installation instructions assume you have set up the AWS Amplify CLI before.
3. `amplify init` to initialize the directory as an AWS Amplify Javascript app using the React framework.
    - Note: For the profile I chose to provide the access key of a user to simplify data access.
4. `amplify push` Provision your cloud resources based on the local setup and configured features. 
   - Note: When asked to generate code, answer NO (answering YES overwrites the current custom files in the src/graphql folder).
5. `amplify add hosting` to publish the frontend code.
   - Note: Choose hosting with Amplify Console
   - Note: Choose continous deployment

## Developer Reasoning & Ramblings

I chose the tech stack in order to take the opportunity to learn this tech stack. To give context, I haven't written in React to this level nor have I utilized the AWS stack to this extent either. I started this Monday with zero knowledge of how to use React, AWS Appsync, AWS Amplify, GraphQL on that platform and DynamoDB.

I had naively thought that React can't be that much different from Angular or Vue but I found it is quite different in methodologies from what I am used to.

My biggest struggles and time losses were in the subscription response as I kept getting a null response. I had to just scrap it and move on and at this point I would reach out to my peers and see what silly thing I was overlooking.

~If time and skills allow I will be taking the plunge into learning how the AWS Lambda functions work as the address to lat/long lookup doesn't belong on the client side.~ I've implemented the Google geocode api cient side as diving into the Lambda world without a mentor seems a tad daunting. It makes sense to me what/how it works but tying it all together has escaped me.

## Unit Tests

I am at a crossroads with these unit tests. For this particular app I ran into two road blocks. First one being the only functions that made sense to unit test are very simple state changes and second one being I am not sure how to actually do unit tests in react.

So obviously, I can write a unit test but the react testing ecosystem is a bit strange from what I am gathering. You can use the rendering and enzyme tools to render the output and check for it but then why would I use cypress? I also wasn't sure how to stub and mock things out. Perhaps I am just so used to the component stuff in angular and vue? In the end I just found it super frustrating in particular with the card rendering stuff. I gave it the mock data but the tests would fail because the card itself was off the virtual DOM I think? 🤔  Not quite sure here.
