# Default Lambda Role
resource "aws_iam_role" "iam_lambda_role" {
  name               = "${var.prefix}_iam_lambda_role"
  assume_role_policy = file("./roles/lambda.json")
}

# Default Invoke Lambda policy
resource "aws_iam_policy" "iam_invoke_lambda_policy" {
  name   = "${var.prefix}_iam_invoke_lambda_policy"
  policy = file("./policies/lambda.json")
}