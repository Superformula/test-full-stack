# Superformula Developer Test (v1.0.0)

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
- [ ] Map with user location updates async - when user changes "location" field

## Development

In the project directory, you can run:

- `yarn start`. Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

- `yarn test` Launches the test runner in the interactive watch mode.

- `yarn build` Builds the app for production to the `build` folder.

## Deployment

Will update in a follow up commit.

## Developer Reasoning & Ramblings

I chose the tech stack in order to take the opportunity to learn this tech stack. To give context, I haven't written in React to this level nor have I utilized the AWS stack to this extent either. I started this Monday with zero knowledge of how to use React, AWS Appsync, AWS Amplify, GraphQL on that platform and DynamoDB.

I had naively thought that React can't be that much different from Angular or Vue but I found it is quite different in methodologies from what I am used to.

My biggest struggles and time losses were in the subscription response as I kept getting a null response. I had to just scrap it and move on and at this point I would reach out to my peers and see what silly thing I was overlooking.

If time and skills allow I will be taking the plunge into learning how the AWS Lambda functions work as the address to lat/long lookup doesn't belong on the client side (my gut feeling).
