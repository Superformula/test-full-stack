#https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elasticsearch_domain
resource "aws_elasticsearch_domain" "terraform-appsync-elasticsearch" {
  domain_name = var.es_domain

  elasticsearch_version = "5.5"

  cluster_config {
    instance_count = 1
    zone_awareness_enabled = false
    instance_type = "t2.small.elasticsearch"
  }

  advanced_options = {
    #Allow indices to be referenced on the body of HTTP request. Since I'm not using any fancy proxies nor granular
    #permissions for each index or sub-resource, this will do.
    "rest.action.multi.allow_explicit_index": "true"
    "indices.fielddata.cache.size": ""
  }

  access_policies = <<EOL
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "${aws_iam_role.elastic_datasource_role.arn}"
      },
      "Action": [
        "es:ESHttpDelete",
        "es:ESHttpHead",
        "es:ESHttpGet",
        "es:ESHttpPost",
        "es:ESHttpPut"
      ],
      "Resource": "arn:aws:es:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:domain/${var.es_domain}/*"
    }
  ]
}
EOL

  ebs_options {
    ebs_enabled = true
    iops = 0
    volume_size = 10
    volume_type = "gp2"     #https://aws.amazon.com/ebs/features/
  }
}