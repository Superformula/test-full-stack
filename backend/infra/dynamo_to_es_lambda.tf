resource "aws_iam_role" "dynamo_lambda_role" {
  name = "${var.appName}-dynamo_to_es-lambda"
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
  description = "Role for the lambda function responsible for pulling data from the DynamoStream and into ElasticSearch"
}

resource "aws_iam_role_policy_attachment" "add_logs-dynamo_to_es" {
  policy_arn = aws_iam_policy.lambda_logging.arn
  role = aws_iam_role.dynamo_lambda_role.name
}

resource "aws_iam_role_policy_attachment" "add_elastic_search-dynamo_to_es" {
  policy_arn = aws_iam_policy.elastic_search_access.arn
  role = aws_iam_role.dynamo_lambda_role.name
}

resource "aws_iam_role_policy_attachment" "add_dynamo_access-dynamo_to_es" {
  policy_arn = aws_iam_policy.post_table_dynamo_access.arn
  role = aws_iam_role.dynamo_lambda_role.name
}

resource "aws_lambda_event_source_mapping" "dynamo_stream" {
  event_source_arn = aws_dynamodb_table.users_table.stream_arn
  function_name = aws_lambda_function.dynamo_to_es.function_name
  starting_position = "LATEST"
  enabled = true
  batch_size = 1  //In a real-word environment we could look into tweaking the batch_size. But for the sake of simplicity, I will keep it as 1
}

resource "aws_lambda_function" "dynamo_to_es" {
  #Identity
  function_name = "${var.appName}_dynamo_to_es"
  role = aws_iam_role.dynamo_lambda_role.arn

  #Code
  handler = "elasticWriter.handler"
  filename = "${path.module}/../lambdas/.serverless/elasticWriter.zip"
  source_code_hash = filebase64sha256("${path.module}/../lambdas/.serverless/elasticWriter.zip")

  #Environment
  runtime = "nodejs12.x"
  timeout = "10"
  environment {
    variables = {
      "ES_ENDPOINT" = aws_elasticsearch_domain.terraform-appsync-elasticsearch.endpoint
      "ES_REGION" =  data.aws_region.current.name
    }
  }
}