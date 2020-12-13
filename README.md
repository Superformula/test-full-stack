# Superformula Full Stack Developer Test
This document describes the architecture of the application and how to run int

## Backend

- TODO: Add intro


- TODO: Add a diagram showcasing the overall view of the system and how modules interact with each other
  - Mention retry policy on the event stream in order to keep eventual consistency on the system
  - Flexible querying system with Elasticsearch


- TODO: describe the data models


- TODO: Add pre-requisites (?)
  - User authed on the  AWS CLI 


- TODO: Give instruction on how to set the code up from scratch
    - Login to your account on the AWS cli
    - Download serverless
    - Install dependencies
    - Build lambda packages
    - Run `terraform get` to download the module `terraform-aws-modules/appsync/aws`
    - Set terraform `variables`
    - Run `terraform init`
    - Run `terraform apply`
    - Add a disclaimer about long Terraforming times due to the creation of an Elastic Search domain (creation ranges from 10 - 20 min)
  

-  TODO: Add somewhere that all lambdas were packaged together for convenience and in a real world app with multiple lambda functions I would break them down into individual packages

  
## Technical debts

- Improve AWS typing in the `elasticWriter` component and avoid using private AWS SDK APIs
