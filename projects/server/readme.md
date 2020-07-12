# Full Stack Sample Server

Generic server full stack sample.

## Installation

Requires `npm` and `Nodejs >= 12.x`. (npm is usually installed with node.)

To install the necessary packages for development and deployment, run `npm install` in this directory.

## Deploy

The deploy pipeline uses the AWS CLI and `serverless`. Read how to install the AWS CLI here https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html.

Create profile 'sf' in your AWS Credentials - `serverless` will use that to upload the BE. See here to create that profile https://docs.aws.amazon.com/sdk-for-php/v3/developer-guide/guide_credentials_profiles.html or https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html.

Ensure that these credentials have the correct permissions to deploy a lambda.

Finally, install `serverless`, `npm install -g serverless`.

Once you have all the necessary tools installed and your 'sf' AWS Credentials configured, you can deploy the lambda using `npm run deploy`. Once complete, this will print out the url for the API - make note of it!

Before continuing with testing, be sure to perform the __deployment configuration__.

### Deployment Configuration

__Keep your keys secret!__

Since the lambda has access to other resources on AWS, it needs credentials to do so.

You must set the following environment variables in the lambda after deploy. At the moment, navigate to the created lambda in the console, and add the credentials.

Note! These can be the same keys that you used to configure the aws-cli, however, you may want a more restrictive role for this.

You will additionally need a Google Geocoding API key, you can create a key on the Google Cloud Platform and managing credentials there. 

```
CONFIG_ACCESS_KEY_ID := AWS Role Access Key
CONFIG_SECRET_KEY := AWS Role Secret Key
CONFIG_MAPS_KEY := Google maps API key
```

Permissions needed by lambda credentials (CONFIG_ACCESS_KEY_ID and CONFIG_SECRET_KEY). Note! The lambda creates the table.

```
dynamodb:Query
dynamodb:Scan
dynamodb:GetItem
dynamodb:PutItem
dynamodb:UpdateItem
dynamodb:DeleteItem
dynamodb:CreateTable
```

Permissions needed by CONFIG_MAPS_KEY.

```
GCP Key Permissions:
- Geocoding API
```

```
TODO:
-- Serverless.yml should specify role so we don't need to manually input credentials?
-- Perhaps build the Google key into the build?
```

## Tests

Unit tests are provided for the endpoints in the graphql. They use jest.

Before running your test you must set the environment variables needed by the lambda. See deploy.
E.g. Using cross-env

```
node_modules/.bin/cross-env CONFIG_ACCESS_KEY_ID='<>' CONFIG_SECRET_KEY='<>' CONFIG_MAPS_KEY='<>' npm run test
```

During the tests, the lambda handler will be invoked. It will attempt to connect to the dynamoDb database.
NOTE! At this time, the tests utilize the production database. 

```
Todo:
-- Allow a dynamo db endpoint to be passed in rather than use global.
-- Find a better way to pass in AWS CLI credentials.
-- Parameterize the database.
```

## Contribution

Anyone is free to submit pull-requests. Please run `npm run lint` prior.

## Exploration

There are saved `postman` requests in `tools/postman`. To help understand this API, give those a look! You can import `/tools/postman/Lambda-Backend.postman_collection.json` into Postman! __Be sure to update the lambda base url!__ The base url is the url provided the deployment procedure.

```
TODO:
-- Use an API doc generator
```

### API Documentation

There are 2 endpoints available on this backend. All paths are relative to the base host url provided by AWS API Endpoint.

Note! See the graphql schema for request/response information.

```
Geocode
=======
Request
~~~~~~~
GET /geocode?address=<address string>

Response
~~~~~~~~
200 OK
Content-Type: application/json

{
    "lat": float,
    "lng": float
}

```
```
GraphQl
=======
Request
~~~~~~~
POST /graphql
Content-Type: application/json

<graphql query>

Response
~~~~~~~~
<graphql>

```