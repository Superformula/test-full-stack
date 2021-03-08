## node-fetch

# Zip source code
data "archive_file" "node-fetch_lambda_zip" {
  type        = "zip"
  source_dir = "./services/layers/node-fetch"
  output_path = "./zip/nodeFetch.zip"
}

resource "aws_lambda_layer_version" "nodeFetch_lambda_layer" {
  filename   = "./zip/nodeFetch.zip"
  layer_name = "${var.prefix}_node-fetch_lambda_layer"

  compatible_runtimes = ["nodejs12.x"]
}