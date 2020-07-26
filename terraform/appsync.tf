resource "aws_dynamodb_table" "person" {
  name           = "PersonTable-${var.stage}"
  billing_mode   = "PROVISIONED"
  read_capacity  = 20
  write_capacity = 20
  hash_key       = "id"

  global_secondary_index {
    hash_key        = "name"
    name            = "name-index"
    projection_type = "ALL"
    read_capacity   = 20
    write_capacity  = 20
  }

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "name"
    type = "S"
  }

  tags = {
    Name        = "person-table-1"
    Environment = var.stage
  }
}

resource "aws_iam_role" "api" {
  name = "${var.appname}-role-${var.stage}"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "appsync.amazonaws.com"
      },
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "api_to_dynamodb_policy" {
  name = "${var.appname}_api_dynamodb_policy-${var.stage}"
  role = aws_iam_role.api.id

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:UpdateItem",
        "dynamodb:DeleteItem",
        "dynamodb:Query",
        "dynamodb:Scan"
      ],
      "Effect": "Allow",
      "Resource": [
        "${aws_dynamodb_table.person.arn}",
        "${aws_dynamodb_table.person.arn}/index/name-index"
      ]
    }
  ]
}
EOF
}

data "local_file" "schema" {
  filename = "${path.module}/appsync/schema.graphql"
}

resource "aws_appsync_graphql_api" "appsyncapi" {
  authentication_type = "API_KEY"
  name                = "${var.appname}_appsync_api"
  schema              = data.local_file.schema.content
}

resource "aws_appsync_datasource" "person" {
  api_id           = aws_appsync_graphql_api.appsyncapi.id
  name             = "${var.appname}_appsync_person_ds_${var.stage}"
  service_role_arn = aws_iam_role.api.arn
  type             = "AMAZON_DYNAMODB"

  dynamodb_config {
    table_name = aws_dynamodb_table.person.name
  }
}

data "local_file" "create_person_mapping" {
  filename = "${path.module}/appsync/createPerson-mapping-request.txt"
}

data "local_file" "update_person_mapping" {
  filename = "${path.module}/appsync/updatePerson-mapping-request.txt"
}

data "local_file" "delete_person_mapping" {
  filename = "${path.module}/appsync/deletePerson-mapping-request.txt"
}

data "local_file" "list_persons_mapping_request" {
  filename = "${path.module}/appsync/listPersons-mapping-request.txt"
}

data "local_file" "list_persons_mapping_response" {
  filename = "${path.module}/appsync/listPersons-mapping-response.txt"
}

data "local_file" "get_person_mapping_request" {
  filename = "${path.module}/appsync/getPerson-mapping-request.txt"
}

resource "aws_appsync_resolver" "createPerson" {
  type              = "Mutation"
  api_id            = aws_appsync_graphql_api.appsyncapi.id
  field             = "createPerson"
  data_source       = aws_appsync_datasource.person.name
  request_template  = data.local_file.create_person_mapping.content
  response_template = "$util.toJson($ctx.result)"
}

resource "aws_appsync_resolver" "updatePerson" {
  type              = "Mutation"
  api_id            = aws_appsync_graphql_api.appsyncapi.id
  field             = "updatePerson"
  data_source       = aws_appsync_datasource.person.name
  request_template  = data.local_file.update_person_mapping.content
  response_template = "$util.toJson($ctx.result)"
}

resource "aws_appsync_resolver" "deletePerson" {
  type              = "Mutation"
  api_id            = aws_appsync_graphql_api.appsyncapi.id
  field             = "deletePerson"
  data_source       = aws_appsync_datasource.person.name
  request_template  = data.local_file.delete_person_mapping.content
  response_template = "$util.toJson($ctx.result)"
}

resource "aws_appsync_resolver" "listPersons" {
  type              = "Query"
  api_id            = aws_appsync_graphql_api.appsyncapi.id
  field             = "persons"
  data_source       = aws_appsync_datasource.person.name
  request_template  = data.local_file.list_persons_mapping_request.content
  response_template = data.local_file.list_persons_mapping_response.content
}

resource "aws_appsync_resolver" "getPerson" {
  type              = "Query"
  api_id            = aws_appsync_graphql_api.appsyncapi.id
  field             = "person"
  data_source       = aws_appsync_datasource.person.name
  request_template  = data.local_file.get_person_mapping_request.content
  response_template = "$util.toJson($ctx.result)"
}
