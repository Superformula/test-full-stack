# IAM role
resource "aws_iam_role" "iam_appsync_role" {
  name               = "${var.prefix}_iam_appsync_role"
  assume_role_policy = file("./roles/appSync.json")
}

# Create the AppSync GraphQL api.
resource "aws_appsync_graphql_api" "appsync" {
  name                = "${var.prefix}_appsync"
  schema              = file("schema.graphql")
  authentication_type = "API_KEY"
}

# Create the API key.
resource "aws_appsync_api_key" "appsync_api_key" {
  api_id = aws_appsync_graphql_api.appsync.id
}



## UserTable ##

# Create data source in appsync from lambda function.
resource "aws_appsync_datasource" "UserTable_datasource" {
  api_id           = aws_appsync_graphql_api.appsync.id
  name             = "${var.prefix}_UserTable_datasource"
  service_role_arn = aws_iam_role.iam_appsync_role.arn
  type             = "AMAZON_DYNAMODB"
  dynamodb_config {
    table_name = aws_dynamodb_table.UserTable.name
  }
}

# Attach Table policy to AppSync role.
resource "aws_iam_role_policy_attachment" "appsync_manage_UserTable" {
  role       = aws_iam_role.iam_appsync_role.name
  policy_arn = aws_iam_policy.iam_UserTable_policy.arn
}

# Create resolver using templates in /resolvers/crud.
resource "aws_appsync_resolver" "listUsers_resolver" {
  api_id      = aws_appsync_graphql_api.appsync.id
  type        = "Query"
  field       = "listUsers"
  data_source = aws_appsync_datasource.UserTable_datasource.name

  request_template  = file("./resolvers/crud/list/request.vtl")
  response_template = file("./resolvers/crud/list/response.vtl")
}