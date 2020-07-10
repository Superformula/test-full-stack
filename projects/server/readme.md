# Full Stack Sample Server

Generic server full stack sample.

## Installation

Requires `npm` and `Nodejs >= 12.x`. (npm is usually installed with node.)

The Graphql server for this full stack example simply uses AWS Appsync. Since AWS Appsync is a managed Graphql API, this repository simply stores configuration.

For 'local' installation of the Graphql, you can use the development deployment code.
https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html

To install the necessary packages for development and deployment, run `npm install` in this directory.

## Deploy

The deploy pipeline uses the AWS CLI and `serverless`. Read how to install the AWS CLI here https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html.

Create profile 'sf' in your AWS Credentials - `serverless` will use that to upload the BE. See here to create that profile https://docs.aws.amazon.com/sdk-for-php/v3/developer-guide/guide_credentials_profiles.html or https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html.

Ensure that these credentials have the correct permissions to deploy a lambda.

Finally, install `serverless`, `npm install -g serverless`.

Since the lambda has access to other resources on AWS, it needs credentials to do so.

You must set the following environment variables in the lambda after deploy. At the moment, navigate to the created lambda in the console, and add the credentials.
Note! These can be the same keys that you used to configure the aws-cli, however, you may want a more restrictive role for this.

```
CONFIG_ACCESS_KEY_ID := Role Access Key
CONFIG_SECRET_KEY := Role Secret Key
```

Permissions needed by lambda credentials. Note! The lambda creates the table.

```
dynamodb:Query
dynamodb:Scan
dynamodb:GetItem
dynamodb:PutItem
dynamodb:UpdateItem
dynamodb:DeleteItem
dynamodb:CreateTable
```

```
TODO:
-- Serverless.yml should specify role so we don't need to manually input credentials?
```

## Tests

Unit tests are provided for the endpoints in the graphql. They use jest.

Before running your test you must set the environment variables needed by the lambda. See deploy.

E.g. Using cross-env

```
node_modules/.bin/cross-env CONFIG_ACCESS_KEY_ID='<>' CONFIG_SECRET_KEY='<>' npm run test
```

```
Todo:
-- Allow a dynamo db endpoint to be passed in rather than use global.
-- Find a better way to pass in AWS CLI credentials.
```

## Exploration

There are saved `postman` requests in `tools/postman`. To help understand this API, give those a look!

```
TODO:
-- Parameterise my postman requests and save them there
```