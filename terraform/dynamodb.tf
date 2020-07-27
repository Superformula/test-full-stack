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