resource "aws_dynamodb_table" "user" {
  name           = "UserTable-${var.stage}"
  billing_mode   = "PROVISIONED"
  read_capacity  = 20
  write_capacity = 20
  hash_key       = "id"

  global_secondary_index {
    hash_key        = "name"
    range_key       = "createdAt"
    name            = "name-index"
    projection_type = "ALL"
    read_capacity   = 20
    write_capacity  = 20
  }

  global_secondary_index {
    hash_key        = "status"
    range_key       = "createdAt"
    name            = "status-index"
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

  attribute {
    name = "status"
    type = "S"
  }

  attribute {
    name = "createdAt"
    type = "S"
  }

  tags = {
    Name        = "user-table-1"
    Environment = var.stage
  }
}