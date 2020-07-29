resource "aws_lambda_function" "address_lambda" {
  filename         = "${path.module}/../api/.serverless/marcelinosf.zip"
  function_name    = "${var.appname}_address_${var.stage}"
  role             = aws_iam_role.lambda_role.arn
  handler          = "address.handler"
  source_code_hash = filebase64sha256("${path.module}/../api/.serverless/marcelinosf.zip")

  runtime          = "nodejs10.x"
  timeout          = "30"

  environment {
    variables = {
      "GOOGLE_MAPS_TOKEN" = var.google_maps_token
    }
  }
}
