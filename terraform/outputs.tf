output "appsync_api_key" {
  value = aws_appsync_api_key.appsync_api_key.key
}

output "appsync_endpoint" {
  value = aws_appsync_graphql_api.appsync_api.uris["GRAPHQL"]
}