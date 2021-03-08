# Zip source code
data "archive_file" "getLocationInfo_lambda_zip" {
  type        = "zip"
  source_dir = "./services/getLocationInfo/dist"
  output_path = "./zip/getLocationInfo.zip"
}

# Create lambda function from zip file, with lambda role.
resource "aws_lambda_function" "getLocationInfo_lambda" {
  function_name = "${var.prefix}_getLocationInfo_lambda"
  role          = aws_iam_role.iam_lambda_role.arn
  filename         = data.archive_file.getLocationInfo_lambda_zip.output_path
  source_code_hash = data.archive_file.getLocationInfo_lambda_zip.output_base64sha256
  runtime       = "nodejs12.x"
  handler = "index.handler"
  layers = [aws_lambda_layer_version.nodeFetch_lambda_layer.arn]
}

# Lambda Function Log Group
resource "aws_cloudwatch_log_group" "getLocationInfo_lambda_log_group" {
  name              = "/aws/lambda/${var.prefix}_getLocationInfo_lambda"
  retention_in_days = 14
}

# Allow lambda to push logs
resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.iam_lambda_role.name
  policy_arn = aws_iam_policy.iam_push_logs_policy.arn
}