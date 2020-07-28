resource "null_resource" "address_build" {
  provisioner "local-exec" {
    working_dir = "${path.module}/../api"
    command     = "serverless package"
  }
}

resource "aws_lambda_function" "address_lambda" {
  filename         = "${path.module}/../api/.serverless/marcelinosf.zip"
  function_name    = "${var.appname}_address_${var.stage}"
  role             = aws_iam_role.lambda_role.arn
  handler          = "address.handler"
  source_code_hash = filebase64sha256("${path.module}/../api/.serverless/marcelinosf.zip")

  runtime          = "nodejs10.x"
  timeout          = "30"
  depends_on       = [null_resource.address_build]

  environment {
    variables = {
      "GOOGLE_MAPS_TOKEN" = var.google_maps_token
    }
  }
}
