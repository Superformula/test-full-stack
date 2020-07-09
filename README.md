# Superformula Full Stack Developer Test

To run this code, first pull the repo, `cd` into it, install dependencies with `yarn install`, then run the project with `yarn start`.

## Backend Design

The backend for this application is built on AWS Amplify using a manually created DynamoDB table `Users`. AWS AppSync is used to federate those resources into a GraphQL Apollo client for the frontend to use.

`src/aws-exports.js` contains the Amplify code-generated credentials connected to my AWS profile, and already contains API key based credentials for API access. The project can be run directly after pulling it from this repository.

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

## Frontend Design

This frontend is built on `create-react-app` in `typescript` using `redux` as a global state store. All business logic is contained inside the `Store` folder.
