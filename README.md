# Superformula Full Stack Developer Test

This is the solution for the Backend section of the test.

### Live Demo
Use GraphQL api [here](https://pckwbzav6nazdnitbphembx2ne.appsync-api.us-east-2.amazonaws.com/graphql/ "Live API Demo"). An API key can be provided by sending me an email request.


## Solution Breakdown

### Tools and Services
- **GraphQL API**: Appsync
- **Data Store**: DynamoDB
- **Custom Location Service**: NodeJS (Typescript) + AWS Lambda
- **IAC**: Terraform
- **Location API**: Mapbox

## General Description and How to Run
The provided solution uses Terraform in order to provision AWS infrastructure. In order to deploy the project, a `variables.tf` file must be defined on the root of the project in order to define necessary parameters such as AWS credentials and MapBox access token. Here's a sample file:


    variable "aws_credentials_profile" {
      default = "[your aws profile]"
      type    = string
    }
    
    variable "aws_region" {
      default = "us-east-2"
      type    = string
    }
    
    # This is the prefix for the name of every created service.
    variable "prefix" {
      default = "coding_challenge"
      type    = string
    }
    
    variable "environment" {
      description = "Deployment Environment"
      type        = string
      default     = "development"
    }
    
    variable "enableTracing" {
      description = "Enable Tracing of API Resources"
      type = bool
      default = false
    }
    
    variable "apiLoggingLevel" {
      description = "Set Logging Level. ALL, ERROR, NONE are available options"
      type = string
      default = "ALL"
    }
    
    variable "MAPBOX_ACCESS_TOKEN" {
      type = string
      default = "[your mapbox token]"
    }
	

Once this file is created, run:

    terraform init
	
In order to setup your terraform local state. Then, when you are ready to deploy to AWS, run:

    terraform apply
	
If the command succeeds, you will find the deployed infrastructure in the AWS account configured above. Some of the deployed artifacts include:
- Several IAM roles, policies and mappings
- AppSync API providing queries and mutations create/read/update/delete users from a DynamoDB table. These operations are supported by AppSync default vtl resolvers
- GetLocationInfo Query supported by a AWS Lambda function with `npm` dependencies bundled as AWS Lambda Layers

## Error Handling Strategy
At the moment, the provided strategy is a simple logging mechanism that stores formatted error objects to CloudWatch. However, this can be improved in a variety of ways:
- My first improvement would be adding a DLQ for each Lambda function, in order to use it as a target buffer for failed Lambda Messages. After setting up the DLQ, we could build another lambda to consume this messages and reprocess them if necessary. For the given requirement of returning Location Data, requeuing failed attempts does not seem fitting.
- Another improvement would be adding a CloudWatch Alarm and a Notification system (using SNS and another Lambda function) in order to alert the respective support team/devs via email or sms.

## Wishlist
I must admit that this solution was built with very little Terraform knowledge, so I'm sure there is lots of room for improvement in terms of making Terraform code more modular, having reusable resources, and a better way to set parameters (thinking of CI/CD integration).
In addition to that, while coding this small example, I already found issues trying to decouple the main infrastructure logic (API) and the infrastructure for the many different Bounded Contexts that would surely be defined on a real app. For this particular scenario, I would like to find a way to separate the GetLocationInfo Lambda declarations completely from the UsersTable declarations and the main API.