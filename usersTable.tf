resource "aws_dynamodb_table" "UserTable" {
  name           = "Users"
  billing_mode   = "PROVISIONED"
  read_capacity  = 5
  write_capacity = 5
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }

  tags = {
    Name        = "UserTable"
    Environment = var.environment
  }
}

data "template_file" "UserTable_iam_policy_template" {
  template = file("./policies/dynamoDBTable.tpl")
  vars = {
    tableARN = aws_dynamodb_table.UserTable.arn
  }
}

# IAM policy
resource "aws_iam_policy" "iam_UserTable_policy" {
  name   = "${var.prefix}_iam_UserTable_policy"
  policy = data.template_file.UserTable_iam_policy_template.rendered
}