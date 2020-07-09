# Superformula Full Stack Developer Test

To run this code, first pull the repo, `cd` into it, install dependencies with `yarn install`, then run the project with `yarn start`.

## Backend Design

The backend for this application is built on AWS Amplify conncted to a manually created DynamoDB table `Users`. Amplify generates a GraphQL schema, then AWS AppSync is used to federate those resources into an Apollo client for the React frontend to use.

`src/aws-exports.js` contains the Amplify code-generated credentials connected to an AWS profile, and already contains API key based credentials for API access. The project can be run directly after pulling it from this repository.

There is an additional GraphQL Query defined that does not follow from the DynamoDB table: `getUserGeolocation`. It is still pulled down from the cloud by Amplify and federated by AppSync, but it is a Query that uses AWS Lambda as a data source rather than DynamoDB. It functions by calling the `mapbox` API to get a user's geolocation based on their `.address` field.

### User Model

```
{
  "id": "xxx",                  // user ID (must be unique) [required]
  "name": "backend test",       // user name [required]
  "dob": "",                    // date of birth [optional]
  "address": "",                // user address [required]
  "description": "",            // user description [required]
  "createdAt": ""               // user created date [required]
  "updatedAt": ""               // user updated date [required]
}
```

## Frontend Design

This frontend is built on `create-react-app` in `typescript` using `redux` as a global state store. All business logic is contained inside the `Store` folder.

The app generally functions via using the React component tree as the controller for business logic triggers. `useEffect` hooks are placed inside components, and when they are mounted to the tree, effects are triggered.
