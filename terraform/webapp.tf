resource "aws_s3_bucket" "webapp_bucket" {
  bucket = "${var.appname}-webapp-${var.stage}"
  acl    = "public-read"

  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}

resource "aws_s3_bucket_policy" "webapp_bucket_policy" {
  bucket = aws_s3_bucket.webapp_bucket.bucket
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": "*",
    "Action": [
      "s3:GetObject"
    ],
    "Resource": [
      "${aws_s3_bucket.webapp_bucket.arn}/*"
    ]
  }]
}
EOF
}

locals {
  mime_type_mappings = {
    html = "text/html",
    js   = "text/javascript",
    css  = "text/css"
    svg  = "image/svg+xml"
    txt  = "text/plain"
    json = "application/json"
    png  = "image/png"
  }
}


resource "null_resource" "webapp_build" {
  provisioner "local-exec" {
    command = "yarn build"
    interpreter = ["bash", "-c"]
    working_dir = "${path.module}/../web"
    environment = {
      REACT_APP_MAP_TOKEN       = var.mapbox_token
      REACT_APP_MAP_STYLE       = var.mapbox_style
      REACT_APP_GRAPHQL_REGION  = var.region
      REACT_APP_GRAPHQL_URI     = aws_appsync_graphql_api.appsync_api.uris["GRAPHQL"]
      REACT_APP_GRAPHQL_TOKEN   = aws_appsync_api_key.appsync_api_key.key
    }
  }
}

resource "null_resource" "s3_sync" {
  provisioner "local-exec" {
    command = "aws s3 sync ${path.module}/../web/build s3://${aws_s3_bucket.webapp_bucket.id}"
    environment = {
      AWS_ACCESS_KEY_ID         = var.aws_access_key_id
      AWS_SECRET_ACCESS_KEY     = var.aws_secret_access_key
    }
  }
  depends_on   = [null_resource.webapp_build]
}