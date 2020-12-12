# https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/dynamodb_table
resource "aws_dynamodb_table" "users_table" {
  hash_key = "id"
  name = "${var.appName}-UsersTable"

  #DynamoDB Defaults with no dynamic scaling
  write_capacity = 5
  read_capacity = 5

  server_side_encryption {
    enabled = true
  }

  attribute {
    name = "id"
    type = "S"
  }

  #Enable streaming data from this Dynamo DB instance
  stream_enabled = true
  stream_view_type = "NEW_AND_OLD_IMAGES"
}