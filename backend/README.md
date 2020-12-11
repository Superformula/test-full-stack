# Superformula Full Stack Developer Test - Backend

This is the GraphQL API that can `create/read/update/delete` user data from a persistence store.
It was built using:

- **AWS AppSync**: is a fully managed service that makes it easy to develop GraphQL APIs by handling the heavy lifting of securely connecting to data sources like DynamoDB, Lambda, etc.
  The graphql schema is defined in `schema.graphql`. The mappings for the APIs are described in the serverless file and the sources are located in the `mapping-templates` folder.
- **Lambda**: is a serverless compute service that lets you run code without provisioning or managing servers. A Lambda was used to fetch the location information based on the user's address by consuming the MapBox API. The mappings for the Lambda is described in the serverless file and the source is located in the `functions` folder.
- **DynamoDB**: s a key-value and document database that delivers single-digit millisecond performance at any scale. It was used to persistence the user's information.

## Infrastructure

The Serverless framework was used to deploy all resources to an AWS account. The following plugins are being used:

- **serverless-webpack**: it was used to bundle npm modules into the Lambdas.
- **serverless-dynamodb-local**: allows running dynamodb for local development.
- **serverless-appsync-simulator**: allows running AppSync APIs for local development.
- **serverless-offline**: allows running AWS Lambdas and API Gateways for local development.
- **serverless-appsync-plugin**: the plugin to connect with AWS AppSync and be able to deploy the API.

## Development

#### Local development

To run the API locally you need to follow these steps:

1. Copy the `.env.example` as `.env` and fill the environment variables.
2. Install the dependencies with `npm i`.
3. Run the server with `npm start`.
4. Once the server is running, open the [GraphiQl UI](http://localhost:20002/).

#### Deployment

To deploy the API you need to follow these steps:

1. Install the [AWS CLI](https://aws.amazon.com/cli/).
2. Configure your AWS CLI with `aws configure` (need to configure the `AWS Access Key ID` and `AWS Secret Access Key`).
2. Copy the `.env.example` as `.env` and fill the environment variables.
3. Install the dependencies with `npm i`.
4. Deploy the server with `npm deploy`.
