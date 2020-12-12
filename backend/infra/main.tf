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


// Manually create the elastic search resolver because the TF module can't properly create them with the ES version I'm
// using
resource "aws_iam_role" "elastic_datasource_role" {
  name = "${var.appName}_elasticserch_datasource"
  assume_role_policy = <<EOL
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "appsync.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOL
}

resource "aws_iam_role_policy_attachment" "add_elastic_access-appsync_datasource" {
  policy_arn = aws_iam_policy.elastic_search_access.arn
  role = aws_iam_role.elastic_datasource_role.name
}

resource "aws_appsync_datasource" "elastic_search_datasource" {
  api_id = module.appsync.this_appsync_graphql_api_id
  name = "elasticsearch1"
  type = "AMAZON_ELASTICSEARCH"
  service_role_arn = aws_iam_role.elastic_datasource_role.arn

  elasticsearch_config {
    endpoint = "https://${aws_elasticsearch_domain.terraform-appsync-elasticsearch.endpoint}"
    region = var.region
  }
}

resource "aws_appsync_resolver" "elastic_search_resolver" {
  api_id = module.appsync.this_appsync_graphql_api_id
  field = "searchAuthor"
  request_template = file("graphql/searchAuthor-request-map.vtl")
  response_template = file("graphql/searchAuthor-response-map.vtl")
  type = "Query"
  data_source = aws_appsync_datasource.elastic_search_datasource.name
}

