resource "aws_dynamodb_table" "user" {
  name           = "UserTable-${var.stage}"
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
    Name        = "user-table-1"
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
        "${aws_dynamodb_table.user.arn}",
        "${aws_dynamodb_table.user.arn}/index/name-index"
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

resource "aws_appsync_datasource" "user" {
  api_id           = aws_appsync_graphql_api.appsyncapi.id
  name             = "${var.appname}_appsync_user_ds_${var.stage}"
  service_role_arn = aws_iam_role.api.arn
  type             = "AMAZON_DYNAMODB"

  dynamodb_config {
    table_name = aws_dynamodb_table.user.name
  }
}

data "local_file" "create_user_mapping" {
  filename = "${path.module}/appsync/createUser-mapping-request.txt"
}

data "local_file" "update_user_mapping" {
  filename = "${path.module}/appsync/updateUser-mapping-request.txt"
}

data "local_file" "delete_user_mapping" {
  filename = "${path.module}/appsync/deleteUser-mapping-request.txt"
}

data "local_file" "list_users_mapping_request" {
  filename = "${path.module}/appsync/listUsers-mapping-request.txt"
}

data "local_file" "list_users_mapping_response" {
  filename = "${path.module}/appsync/listUsers-mapping-response.txt"
}

data "local_file" "get_user_mapping_request" {
  filename = "${path.module}/appsync/getUser-mapping-request.txt"
}

resource "aws_appsync_resolver" "createUser" {
  type              = "Mutation"
  api_id            = aws_appsync_graphql_api.appsyncapi.id
  field             = "createUser"
  data_source       = aws_appsync_datasource.user.name
  request_template  = data.local_file.create_user_mapping.content
  response_template = "$util.toJson($ctx.result)"
}

resource "aws_appsync_resolver" "updateUser" {
  type              = "Mutation"
  api_id            = aws_appsync_graphql_api.appsyncapi.id
  field             = "updateUser"
  data_source       = aws_appsync_datasource.user.name
  request_template  = data.local_file.update_user_mapping.content
  response_template = "$util.toJson($ctx.result)"
}

resource "aws_appsync_resolver" "deleteUser" {
  type              = "Mutation"
  api_id            = aws_appsync_graphql_api.appsyncapi.id
  field             = "deleteUser"
  data_source       = aws_appsync_datasource.user.name
  request_template  = data.local_file.delete_user_mapping.content
  response_template = "$util.toJson($ctx.result)"
}

resource "aws_appsync_resolver" "listUsers" {
  type              = "Query"
  api_id            = aws_appsync_graphql_api.appsyncapi.id
  field             = "users"
  data_source       = aws_appsync_datasource.user.name
  request_template  = data.local_file.list_users_mapping_request.content
  response_template = data.local_file.list_users_mapping_response.content
}

resource "aws_appsync_resolver" "getUser" {
  type              = "Query"
  api_id            = aws_appsync_graphql_api.appsyncapi.id
  field             = "user"
  data_source       = aws_appsync_datasource.user.name
  request_template  = data.local_file.get_user_mapping_request.content
  response_template = "$util.toJson($ctx.result)"
}
