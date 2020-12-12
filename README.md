# Superformula Full Stack Developer Test
This document describes the architecture of the application and how to run int

## Backend

- TODO: Add intro

- TODO: Add a diagram showcasing the overall view of the system and how modules interact with each other

- TODO: describe the data models

- TODO: Give instruction on how to set the code up from scratch
    - Login to your account on the AWS cli
    - Download serverless
    - Install dependencies
    - Build lambda packages
    - Run `terraform get` to download the module `terraform-aws-modules/appsync/aws`
    - Set terraform `variables`
    - Run `terraform init`
    - Run `terraform apply`
    - Add a disclaimer about long Terraforming times due to the creation of an Elastic Search domain (creation ranges from 10 - 20 min)