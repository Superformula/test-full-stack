variable "appname" {
  default = "marcelinosf"
}

variable "region" {
  default = "us-east-1"
}

variable "profile" {
  default = ""
}

variable "google_maps_token" {
  default = ""
}

variable "aws_access_key_id" {
  default = ""
}

variable "aws_secret_access_key" {
  default = ""
}

variable "aws_session_token" {
  default = ""
}

variable "stage" {
  default = "dev"
}

provider "aws" {
  version    = "~> 2.0"
  profile    = var.profile
  region     = var.region
  access_key = var.aws_access_key_id
  secret_key = var.aws_secret_access_key
  token      = var.aws_session_token
}