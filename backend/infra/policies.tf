resource "aws_iam_policy" "elastic_search_access" {
  name = "elastic_search_policy"
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