variable "region" {
  default = "us-east-1"
  description = "Region where the infrastructure will be terraformed"
}

variable "profile" {
  default = "default"
  description = "The AWS Cli profile that will be used to terraform the infrastructure"
}

variable "appName" {
  default = "superformula_fullstack"
  description = "Name of the app that will be used as a prefix to name resources"
}

variable "es_domain" {
  default = "superformula-fullstack-es"
  description = "The elastic search domain used in this appsync project"
}