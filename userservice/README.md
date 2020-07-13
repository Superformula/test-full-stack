### Setting up the userservice project

1. Go to the projects "userservice" folder

2. Make a copy of both deploy.sh.developement and deploy.e2etest.sh.development 

3. Rename those copy by removing development so it will just be deploy.sh and deploy.e2etest.sh

4. Edit both those files and put your mapbox API token on {youmapboxapikey} in those files.

5. Navigate to the test/integration folder

6. Make a copy of EnvironmentVariable.js.developement and rename it to EnvironmentVariable.js and put in your mapbox API token to process.env.MAP_BOX_API_KEY

   

### Deploying the userservice
The serverless.yml have the region set to us-east-1 and is looking to use the default AWS profile.
1. If you have the docker step setup please enter the bash shell of the container and go to the userservice folder and skip to step 4. Otherwise, follow the next step.
2. Open a shell/command line and navigate to the userservice folder.  Execute npm i, and npm install -g serverless.
3. Go to serverless.yml and set the region you want and the AWS profile you want to use.     
4. Execute ./deploy.sh or npm run deploy_dev and this will deploy the dev version. This will be the service where you will use the site to interact and play with.
5. Execute ./deploy.e2etest.sh or npm run deploy_e2e and this will deploy the e2e version. This will be the service where cypress will run against.



### Running unit test

1. To run unit test simply execute ./run_unit_test.sh or npm run unit-test



### Running integration test

1. Execute sls dynamodb install if you are not using the docker container
2. Execute sls dynamodb start --stage=test
3. Open another shell and navigate back to the userservice folder and execute ./run-integration-test.sh or npm run integration-test



### Project Structure

1. mapping-templates
   - contains all the vtl resolver files.
2. src (This is where all the logic sits. This borrows ideas from the onion core architect.)   

    1. compositeRoot
        - helper function that brings the classes together. (Poor man’s DI)
        
    2. error
        - custom UserServiceError and a logFunction. Will log UserServiceError as warnings
        
    3. graphql
        -  graphQL handler for the requirement to return back location information base on a user
        
    4. lambda
        - All the handlers for the crud logic. AppSync graphQL calls will pretty much get resolve and call into these lambda functions.
        
    5. Model
        - The domain model for the userservice. 
        
    6. Repository
        -  This is the infrastructure layer (data access layer). 
        
    7. Service
        -  The service layer, basically the business logic for the userservice. Since this is crud, is mostly used for validation and calling into the repository layer.
        
3. Test
    - Where all the test sits
4. Other files to pay attention to in the main directory
    - serverless.yml
    - schema.graphql

