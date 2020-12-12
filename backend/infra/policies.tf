resource "aws_iam_policy" "elastic_search_access" {
  name = "${var.appName}-elastic_search_policy"
  description = "Managed Policy for managing elasticsearch domain for AppSync."
  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "es:ESHttpDelete",
                "es:ESHttpHead",
                "es:ESHttpGet",
                "es:ESHttpPost",
                "es:ESHttpPut"
            ],
            "Resource": [
                "${aws_elasticsearch_domain.terraform-appsync-elasticsearch.arn}*"
            ],
            "Effect": "Allow"
        }
    ]
}
EOF
}

resource "aws_iam_policy" "lambda_logging" {
  name = "${var.appName}-lambda_logging"
  description = "IAM policy for logging from a lambda function"
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*",
      "Effect": "Allow"
    }
  ]
}
EOF
}


resource "aws_iam_policy" "post_table_dynamo_access" {
  name = "${var.appName}-dynamodb_to_lambda_policy"
  description = "Managed Policy for DynamoDB streaming to Lambda."
  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "dynamodb:DescribeStream",
                "dynamodb:GetRecords",
                "dynamodb:GetShardIterator",
                "dynamodb:ListStreams"
            ],
            "Resource": [
                "${aws_dynamodb_table.users_table.arn}*",
                "${aws_dynamodb_table.users_table.arn}/*"
            ],
            "Effect": "Allow"
        }
    ]
}
EOF
}