terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.20"
    }
  }
}

provider "aws" {
  profile = "default"
  region  = var.region
}

data "aws_region" "current"{}
data "aws_caller_identity" "current"{}

module "appsync" {
  source  = "terraform-aws-modules/appsync/aws"
  version = "0.8.0"
  name = "${var.appName}-appsync"

  schema = file("graphql/schema.graphql")

  api_keys = {
    default = null #keys will last 7 days.
  }

  datasources = {
    superformula_dynamodb4437 = {
      type       = "AMAZON_DYNAMODB"
      table_name = aws_dynamodb_table.users_table.name
      region     = var.region
    }

  }

  resolvers = {
    "Query.getAllUsers" = {
      data_source       = "superformula_dynamodb4437"
      request_template  = file("graphql/queries/listUsers-request-mapping.vtl")
      response_template = file("graphql/queries/listUsers-response-map.vtl")
    }

    "Mutation.createUser" = {
      data_source       = "superformula_dynamodb4437"
      request_template  = file("graphql/mutations/createUser-request-map.vtl")
      response_template = file("graphql/mutations/createUser-response-map.vtl")
    }
  }
}
