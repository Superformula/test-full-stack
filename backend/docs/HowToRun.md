## How to run the project

### Locally

To install the project, simply run: `yarn install`.

To run locally on a per-function basis, simply run this command in the `backend/` folder:
```
serverless invoke local --function graphql --path localRun/example.json
```

The file `example.json` contains information about the GraphQL endpoint being called, which in this case is `getUsers`, but can be changed with any of the queries, or add files and point the `--path` option into it.


### Deploy

To run the entire project as a whole, it would be better to deploy the entire application and play around with it.
You can achieve this by running `serverless deploy` (having defined your AWS provider; keys, region, etc.).
Then, an example query can be run into the endpoint provided on the output logs from the deploy once it is successfully deployed.

A working example is provided as follows with the host deployed in `https://q2u0wjvapi.execute-api.us-east-1.amazonaws.com/dev/graphql`:

```
curl --location --request POST 'https://q2u0wjvapi.execute-api.us-east-1.amazonaws.com/dev/graphql' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"query {\n    getUsers(limit: 2, lastKey: \"\", name: \"\") {\n        data {\n            id\n            name\n            address\n        }\n        lastKey\n    }\n}","variables":{}}'
```


### Tests

In order to run tests, simply run `yarn run jest`
