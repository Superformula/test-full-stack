data "aws_iam_policy_document" "api_assume_role_document" {
  version = "2012-10-17"

  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["appsync.amazonaws.com"]
    }

    effect = "Allow"
  }
}

resource "aws_iam_role" "api" {
  name               = "${var.appname}_appsync_role_${var.stage}"
  assume_role_policy = data.aws_iam_policy_document.api_assume_role_document.json
}

data "aws_iam_policy_document" "api_dynamo_policy_document" {
  version = "2012-10-17"

  statement {
    effect = "Allow"

    actions = [
      "dynamodb:GetItem",
      "dynamodb:PutItem",
      "dynamodb:UpdateItem",
      "dynamodb:DeleteItem",
      "dynamodb:Query",
      "dynamodb:Scan"
    ]

    resources = [
      aws_dynamodb_table.user.arn,
      "${aws_dynamodb_table.user.arn}/index/name-index",
      "${aws_dynamodb_table.user.arn}/index/status-index"
    ]
  }
}

data "aws_iam_policy_document" "api_lambda_policy_document" {
  version = "2012-10-17"

  statement {
    effect = "Allow"

    actions = [
      "lambda:InvokeFunction"
    ]

    resources = [
      aws_lambda_function.address_lambda.arn
    ]
  }
}

resource "aws_iam_role_policy" "api_to_dynamo_policy" {
  name    = "${var.appname}_api_policy_dynamo_${var.stage}"
  role    = aws_iam_role.api.id
  policy  = data.aws_iam_policy_document.api_dynamo_policy_document.json
}

resource "aws_iam_role_policy" "api_to_lambda_policy" {
  name    = "${var.appname}_api_policy_lambda_${var.stage}"
  role    = aws_iam_role.api.id
  policy  = data.aws_iam_policy_document.api_lambda_policy_document.json
}
