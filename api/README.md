# Backend Context
The backend code was developed using NestJS with GraphQL, AWS, and Serverless.

## Demo of the API
[GraphQL Playground](https://wqjm9ch055.execute-api.us-east-1.amazonaws.com/dev/graphql)

## Use of NestJS
NestJS is a framework to build scalable Node.JS server-side apps. It's 100% typescript supported and combines elements of OOP, FP, and FRP. The technology was chosen because I believe it exemplifies well what the challenge is trying to understand: good use of JS stack technologies, such as NodeJS, understanding of Typescript, and extensible and testable code.

## Technologies being used
- [AWS Lambda](https://aws.amazon.com/lambda)
- [AWS DynamoDB](https://aws.amazon.com/dynamodb)
- [Serverless](https://serverless.com/framework/docs/providers/aws/)
- [NestJS](https://docs.nestjs.com/)
- [NestJS GraphQL](https://docs.nestjs.com/graphql/quick-start)
- [NestJS Dynamoose](https://github.com/hardyscc/nestjs-dynamoose)
- [Mapbox](https://docs.mapbox.com/api/)

## How the resources are being deployed
I am using serverless to deploy all resources via `CloudFormation`. The deployment is done in the following way:
1. Code is compiled with Typescript using local `tsconfig.json`
2. Exclude the development dependencies.
3. Upload CloudFormation file to AWS S3.
4. Upload of the artifacts.
5. Upload a zip version of the app to S3.
6. Updating the AWS stack.

Everything above are done using the following command: `npm run deploy`

# Architecture
The NestJS architecture is integrated with AWS and Serverless. We are using AWS Lambda with API Gateway, and DynamoDB.

Inside the NestJS code, each component has one context responsibility (fetch location data, manage user data), and it's divided into:
- Model, where we have interfaces and strongly typed objects for the general use of the application and/or GraphQL.
- Controller, responsible to have the RESTful endpoints (that was added as a part of the intention of keeping the ecosystem extensible).
- Resolver that is responsible for the GraphQL operations.
- Service is a logical separation between managing data and the rest of the application. 
 
Each of the functionalities inside a component has a unit test file, that works with Jest.

The location service is responsible to communicate with the mapbox-sdk and retrieve geocode coordinates based on a specific address and reply this information to a GraphQL API.

# Installation & Deploy
## Setup AWS Credentials
1. [Sign up for an AWS account](https://serverless.com/framework/docs/providers/aws/guide/credentials#sign-up-for-an-aws-account)

2. Login to your AWS account and go to the **Identity & Access Management (IAM)** page.

3. Click on **Users** and then **Add user**. Enter a name in the first field to remind you this User is related to the Serverless Framework, like `serverless-admin`. Enable **Programmatic access** by clicking the checkbox. Click **Next** to go through to the Permissions page. Click on **Attach existing policies directly**. Search for and select **AdministratorAccess** then click **Next: Review**. Check to make sure everything looks good and click **Create user**.

4. View and copy the **API Key & Secret** to a temporary place. You'll need it in the next step.

## Setup Workstation

Install AWS CLI

- Windows: `choco install awscli`
- macOS: `brew install awscli`

Config AWS CLI

```bash
$ aws configure

AWS Access Key ID [****************TKYQ]:
AWS Secret Access Key [****************yNO2]:
Default region name [None]:
Default output format [None]:
```
> Enter your **AWS Access Key ID** and **AWS Secret Access Key**

## Deployment

```bash
# deploy to AWS
$ npm run deploy
```

## Local Offline Development

```bash
# install dynamodb local
$ npm run ddb:install

# start serverless-offline server
$ npm run sls:start

# start serverless-offline server and connect to online dynamodb
$ npm run sls:online
```

## Local NestJS Development - (Optional)

```bash
# install dynamodb local
$ npm run ddb:install

# start dynamodb local
$ npm run ddb:start

# start local nestjs server
$ npm start

# start local nestjs server in watch mode
$ npm run start:watch

# start local nestjs server and connect to online dynamodb
$ npm run start:online
```

## Unit Testing

```bash
# run unit test
$ npm test

# run unit test with coverage
$ npm run test:cov
```
