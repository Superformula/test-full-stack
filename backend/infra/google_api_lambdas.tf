resource "aws_iam_role" "google_api_lambda_role" {
  name = "${var.appName}-google_api_lambda_role"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
  description = "Role for the lambda functions responsible for interfacing with the Google APIs"
}

resource "aws_iam_role_policy_attachment" "add_logs-google_api" {
  policy_arn = aws_iam_policy.lambda_logging.arn
  role = aws_iam_role.google_api_lambda_role.name
}

resource "aws_lambda_function" "google_api_getAddress_lambda" {
  #Identity
  function_name = "${var.appName}_google_api_getAddress_lambda"
  role = aws_iam_role.google_api_lambda_role.arn

  #Code
  handler = "maps/lambdaEndpoints.getAddressHandler"
  filename = "${path.module}/../lambdas/.serverless/lambdas.zip"
  source_code_hash = filebase64sha256("${path.module}/../lambdas/.serverless/lambdas.zip")

  #Environment
  runtime = "nodejs12.x"
  timeout = "10"
  environment {
    variables = {
      "GMAPS_KEY" = var.gmaps_key
    }
  }
}

resource "aws_lambda_function" "google_api_getCoordinates_lambda" {
  #Identity
  function_name = "${var.appName}_google_api_getCoordinates_lambda"
  role = aws_iam_role.google_api_lambda_role.arn

  #Code
  handler = "maps/lambdaEndpoints.getCoordinatesHandler"
  filename = "${path.module}/../lambdas/.serverless/lambdas.zip"
  source_code_hash = filebase64sha256("${path.module}/../lambdas/.serverless/lambdas.zip")

  #Environment
  runtime = "nodejs12.x"
  timeout = "10"
  environment {
    variables = {
      "GMAPS_KEY" = var.gmaps_key
    }
  }
}