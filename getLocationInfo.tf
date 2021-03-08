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
}