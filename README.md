# TestFullStack Developer Test


# Author: Brian Santarelli

## Tools/libraries
The following tools are used to build/deploy the stack
* `Yarn` with workspaces
* `Typescript`
* `Node.js`
* `jest`
* Back end
  * `Serverless` - Tool for configuring and deploying functions in a semi-IaaS agnostic way
  * `AWS API Gateway/Lambda/DynamoDB/CloudFormation`
  * `TypeGraphQL` - GraphQL server implementation via Typescript decorators
  * `typedi` - tiny Typescript IoC container for dependency injection
  * `winston` - logging
* Front end
  * `React`
  * `Storybook`
  * `Cypress` 

## Project structure
* `Root dir`
  * `lambda-api` - the Node.js/Typescript/Apollo Server/Lambda "application" code
  * `user-mgmt-app` - the React/Typescript SPA code

## Back end

### Composition/topology
The back end consists of an Amazon AWS API Gateway endpoint, an AWS Lambda function and an AWS DynamoDB data store.  Incoming GraphQL POST requests are handled by the API gateway and are forwarded on to the GraphQL Lambda handler to be fulfilled.  

#### Lambda function composition
The Lambda function is composed of two GraphQL resolvers
1) A User CRUD resolver
2) A geocoding resolver (backed by the Mapbox SaaS)

#### Logging strategy
Winston logging was integrated into the Lambda stack.  Winston is configured to log to CloudWatch when deployed in an AWS environment

#### Retry strategy
Currently the Serverless framework does not provide a way to configure retries at the gateway level.  Even though retries are not configurable, it is still possible to configure a dead letter queue (DLQ) via the `onError` property for a function in the serverless.yml configuration file.  To enable a DLQ, simply provide the AWS `arn` for the SNS topic of interest.

Retries are also implemented in the SPA via a retry middleware configured for the Apollo client.  This policy is configure for *only* retrying on a failed query attempt and not for mutations

### Setup

#### Environment
In order to execute requests against the Lamda API both locally and on AWS, the following environment variables need to be set:

| Tables        | Are           |
| ------------- |:-------------:|
| MAPBOX_API_TOKEN  | This is a token (generated or public) needed to use mapbox.com API for geocoding |

This project is set up to use `dotenv` for managing environment variable via a '.env' file in the root of [root dir]/lambdaapi.  Any key/value pair in this file will override the environment provided by the host OS.  This is convenient for local development as project don't need to pollute the global environment.  Of course standard environment variables may also be used.

### Running locally
In order to run your Serverless stack locally execute the following:
```bash
yarn workspace lambda-api serve:dev
```
This command will:
1) Download/install the local DynamoDB image if not installed
2) Start DynamoDB locally
3) Start the Serverless stack which will then listen for incoming requests.  The console output will indicate which endpoints are active:
    ```bash
    offline: Offline [http for lambda] listening on http://localhost:3002
    
       ┌─────────────────────────────────────────────────────────────────────────────┐
       │                                                                             │
       │   POST | http://localhost:7777/graphql                                      │
       │   POST | http://localhost:7777/2015-03-31/functions/lambdaapi/invocations   │
       │   GET  | http://localhost:7777/graphql                                      │
       │   POST | http://localhost:7777/2015-03-31/functions/lambdaapi/invocations   │
       │                                                                             │
       └─────────────────────────────────────────────────────────────────────────────┘
    
    offline: [HTTP] server ready: http://localhost:7777 🚀
    ```

### Deploying to AWS
1) In order to deploy to AWS, you need an IAM with the relevant roles to enable build out of the AWS infrastructure by Serverless/CloudFormation.  See https://www.serverless.com/blog/abcs-of-iam-permissions for an overview of the required roles/permissions for your IAM.
2) Once you have created the appropriate IAM in the AWS console, you will need to prepare your local AWS environment.  The easiet way to do this is to install the AWS command line tools: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html
3) Execute the following from your shell after installing the AWS command line tools:
    ```bash
    aws configure
    ```   
    Fill in the values prompted for from your IAM information
4) Ensure the variables in the table above are exported in the shell in which the deployment is being executed.  For example:
    ```bash
    export MAPBOX_API_TOKEN=<some token>
    ```
5) Deploy (execute from the root of the source tree):
    ```bash
     yarn workspace lambda-api deploy:execute
    ```
6) When the deploy completes, note the endpoints logged to the console by Serverless - these are your endpoints for accesing the a) GraphQL lambda and b) the GraphQL playground.  For example:
    ```
    endpoints:
         POST - https://0gi0frull7.execute-api.us-east-2.amazonaws.com/dev/graphql
         GET - https://0gi0frull7.execute-api.us-east-2.amazonaws.com/dev/graphql
    ```   
    in this case, the POST endpont is the GraphQL API endpoint and the GET endpoint is the GraphQL playground

### Tearing down an AWS deployment
Execute the following from the root of the source tree to tear down an existing Serverless AWS deployment:
```bash
 yarn workspace lambda-api deploy:teardown
```

### Limitations
* The search by user/paging was implemented with cursors to avoid large scans of DynamoDB data while searching paging.  Although this saves some compute time/cost, it will never be efficient for sub-string searching against DynamoDB data.  A viable solution would be integration of an ElasticSearch instance that has an index kept up to date on DynamoDB updates.  This would allow for efficient full text search and paging of the user data. 
* Since there is no unique identifier in the provided schema, it is not possible to have a useful constraint to prevent duplicate or near duplicate users from being created.  i.e. would normally use a unique username or email address for a uniqueness constraint. 
* The current implementation does not configure/implement GraphQL subscriptions.  This would be very useful for updating clients when a new user is added or an existing user is updated.

### TODO
* Add authentication and authorization to the GQL handler
* Integration tests
* Additional unit test coverage


## Front end
