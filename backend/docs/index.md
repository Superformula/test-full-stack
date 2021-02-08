# Basic Requirements

Requirements with strike-through are done.

* ~~Use AWS AppSync (preferred) or AWS Lambda + API Gateway approach~~
* ~~Use any AWS Database-as-a-Service persistence store. DynamoDB is preferred~~
* ~~Write concise and clear commit messages~~
* ~~Write clear documentation on how it has been designed and how to run the code~~
* ~~Add a Query to fetch location information based off the user's address (use NASA or Mapbox APIs); use AWS Lambda~~

## Bonus Requirements

* ~~Use Infrastructure-as-code tooling that can be used to deploy all resources to an AWS account. Examples: CloudFormation / SAM, Terraform, Serverless Framework, etc.~~
* ~~Provide proper unit tests~~
* ~~Providing an online demo is welcomed, but not required~~
* ~~Delete user functionality~~
* Bundle npm modules into your Lambdas

## Advanced Requirements

### Describe your strategy for Lambda error handling, retries, and DLQs

I understand that the error handling is not that granular, but this is because as most of the errors are validated (for which I provided a `ValidationError` to use), other errors can happen when Dynamo things go wrong.
When these unexpected things happen, then we could fail fast (as it is a user-intensive application; the end user is the one consuming it) and then send the error into another lambda that takes care about the error handling.
If the case was with Dynamo, then we should set up an alarm to notify us immediately (as for example when we need more capacity for DynamoDB after pre-provisioning). Other tools can be used for example to call us or send us a slack message like PagerDuty.

In the case of retries, this is error and operation dependent. If we are reading from users and the frontend has already consumed our response, then retrying that operation is completely useless and will only make us pay more for our infra stack, because the user won't notice.
Given that there is no UI for creating a user, that could be an example of where a retry can happen, and we could add a max of 3 times to retry or then fallback into a DLQ that can retry some time later.


### Describe your cloud-native logging, monitoring, and alarming strategy across all queries/mutations

New Relic is a great tool for this purposes. 
In this case, there are no operations dependent on each other so a request ID is not needed in this case, but being the case that this changes, then we should define entrypoints into which we can generate a request-id unique value and send it in the headers, for where then we can log that into a log analysis tool to have human understanding of what has been done and the sequence of the user steps. (New Relic can achieve this.)
This should also be done by defining queries that are the entrypoints of our application (like for example a login query, or querying the dashboard). All other should recieve that as required parameter, enforced by solid testing.

On monitoring, that really depends on what we want to monitor, being this classic system behavior or user behavior whenever we have deployed another version, with for example A/B testing (in case drastic redirections are needed for a flawed version). For example, we could define one of our key metrics (being in this case the amount of "Show more" button clicks over visits), but as well monitor the 99% percentile of OK responses, or execution duration to meet an SLA.
There are several ways to do this, but tackling most crucial parts of the system comes first, so adding adding dashboards (again NR) with defined metrics to monitor and alarms whenever we experience an anomaly on memory consumption/latency, etc.


