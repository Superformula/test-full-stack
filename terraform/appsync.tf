data "local_file" "schema" {
  filename = "${path.module}/appsync/schema.graphql"
}

resource "aws_appsync_graphql_api" "appsync_api" {
  authentication_type = "API_KEY"
  name                = "${var.appname}_appsync_api_${var.stage}"
  schema              = data.local_file.schema.content
}

resource "aws_appsync_api_key" "appsync_api_key" {
  api_id  = aws_appsync_graphql_api.appsync_api.id
}

resource "aws_appsync_datasource" "user" {
  api_id           = aws_appsync_graphql_api.appsync_api.id
  name             = "${var.appname}_appsync_user_ds_${var.stage}"
  service_role_arn = aws_iam_role.api.arn
  type             = "AMAZON_DYNAMODB"

  dynamodb_config {
    table_name = aws_dynamodb_table.user.name
  }
}

resource "aws_appsync_datasource" "address_function" {
  api_id           = aws_appsync_graphql_api.appsync_api.id
  name             = "${var.appname}_appsync_address_${var.stage}"
  service_role_arn = aws_iam_role.api.arn
  type             = "AWS_LAMBDA"

  lambda_config {
    function_arn = aws_lambda_function.address_lambda.arn
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

data "local_file" "search_address_mapping_request" {
  filename = "${path.module}/appsync/searchAddress-mapping-request.txt"
}

data "local_file" "get_coordinates_address_mapping_request" {
  filename = "${path.module}/appsync/getCoordinates-mapping-request.txt"
}

resource "aws_appsync_resolver" "create_user" {
  type              = "Mutation"
  api_id            = aws_appsync_graphql_api.appsync_api.id
  field             = "createUser"
  data_source       = aws_appsync_datasource.user.name
  request_template  = data.local_file.create_user_mapping.content
  response_template = "$util.toJson($ctx.result)"
}

resource "aws_appsync_resolver" "update_user" {
  type              = "Mutation"
  api_id            = aws_appsync_graphql_api.appsync_api.id
  field             = "updateUser"
  data_source       = aws_appsync_datasource.user.name
  request_template  = data.local_file.update_user_mapping.content
  response_template = "$util.toJson($ctx.result)"
}

resource "aws_appsync_resolver" "delete_user" {
  type              = "Mutation"
  api_id            = aws_appsync_graphql_api.appsync_api.id
  field             = "deleteUser"
  data_source       = aws_appsync_datasource.user.name
  request_template  = data.local_file.delete_user_mapping.content
  response_template = "$util.toJson($ctx.result)"
}

resource "aws_appsync_resolver" "list_users" {
  type              = "Query"
  api_id            = aws_appsync_graphql_api.appsync_api.id
  field             = "users"
  data_source       = aws_appsync_datasource.user.name
  request_template  = data.local_file.list_users_mapping_request.content
  response_template = data.local_file.list_users_mapping_response.content
}

resource "aws_appsync_resolver" "get_user" {
  type              = "Query"
  api_id            = aws_appsync_graphql_api.appsync_api.id
  field             = "user"
  data_source       = aws_appsync_datasource.user.name
  request_template  = data.local_file.get_user_mapping_request.content
  response_template = "$util.toJson($ctx.result)"
}

resource "aws_appsync_resolver" "search_address" {
  type              = "Query"
  api_id            = aws_appsync_graphql_api.appsync_api.id
  field             = "searchAddress"
  data_source       = aws_appsync_datasource.address_function.name
  request_template  = data.local_file.search_address_mapping_request.content
  response_template = "$util.toJson($ctx.result)"
}

resource "aws_appsync_resolver" "get_coordinates" {
  type              = "Query"
  api_id            = aws_appsync_graphql_api.appsync_api.id
  field             = "getCoordinates"
  data_source       = aws_appsync_datasource.address_function.name
  request_template  = data.local_file.get_coordinates_address_mapping_request.content
  response_template = "$util.toJson($ctx.result)"
}
