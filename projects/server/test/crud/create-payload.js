module.exports = {
    "resource": "/graphql",
    "path": "/graphql",
    "httpMethod": "POST",
    "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Cache-Control": "no-cache",
        "CloudFront-Forwarded-Proto": "https",
        "CloudFront-Is-Desktop-Viewer": "true",
        "CloudFront-Is-Mobile-Viewer": "false",
        "CloudFront-Is-SmartTV-Viewer": "false",
        "CloudFront-Is-Tablet-Viewer": "false",
        "CloudFront-Viewer-Country": "US",
        "Content-Type": "application/graphql",
        "Host": "0dgcwbc735.execute-api.us-east-1.amazonaws.com",
        "Postman-Token": "43f1a5a8-beeb-4c40-b501-130cd225f4f3",
        "User-Agent": "PostmanRuntime/7.26.1",
        "Via": "1.1 4168db18cb18c32c335e4bb2cb3ef977.cloudfront.net (CloudFront)",
        "X-Amz-Cf-Id": "v9zlOWcftf203RzsNubu3LUwqwQ2x7czHs8iJ8U9LsKNa_ZuE3ltWQ==",
        "X-Amzn-Trace-Id": "Root=1-5f079d71-d3244e02c300e9fa7fedc414",
        "X-Forwarded-For": "136.32.196.195, 70.132.57.74",
        "X-Forwarded-Port": "443",
        "X-Forwarded-Proto": "https"
    },
    "multiValueHeaders": {
        "Accept": [
            "*/*"
        ],
        "Accept-Encoding": [
            "gzip, deflate, br"
        ],
        "Cache-Control": [
            "no-cache"
        ],
        "CloudFront-Forwarded-Proto": [
            "https"
        ],
        "CloudFront-Is-Desktop-Viewer": [
            "true"
        ],
        "CloudFront-Is-Mobile-Viewer": [
            "false"
        ],
        "CloudFront-Is-SmartTV-Viewer": [
            "false"
        ],
        "CloudFront-Is-Tablet-Viewer": [
            "false"
        ],
        "CloudFront-Viewer-Country": [
            "US"
        ],
        "Content-Type": [
            "application/graphql"
        ],
        "Host": [
            "0dgcwbc735.execute-api.us-east-1.amazonaws.com"
        ],
        "Postman-Token": [
            "43f1a5a8-beeb-4c40-b501-130cd225f4f3"
        ],
        "User-Agent": [
            "PostmanRuntime/7.26.1"
        ],
        "Via": [
            "1.1 4168db18cb18c32c335e4bb2cb3ef977.cloudfront.net (CloudFront)"
        ],
        "X-Amz-Cf-Id": [
            "v9zlOWcftf203RzsNubu3LUwqwQ2x7czHs8iJ8U9LsKNa_ZuE3ltWQ=="
        ],
        "X-Amzn-Trace-Id": [
            "Root=1-5f079d71-d3244e02c300e9fa7fedc414"
        ],
        "X-Forwarded-For": [
            "136.32.196.195, 70.132.57.74"
        ],
        "X-Forwarded-Port": [
            "443"
        ],
        "X-Forwarded-Proto": [
            "https"
        ]
    },
    "queryStringParameters": null,
    "multiValueQueryStringParameters": null,
    "pathParameters": null,
    "stageVariables": null,
    "requestContext": {
        "resourceId": "22z8a2",
        "resourcePath": "/graphql",
        "httpMethod": "POST",
        "extendedRequestId": "PbWJyGiiIAMFaOg=",
        "requestTime": "09/Jul/2020:22:42:57 +0000",
        "path": "/dev/graphql",
        "accountId": "913855206210",
        "protocol": "HTTP/1.1",
        "stage": "dev",
        "domainPrefix": "0dgcwbc735",
        "requestTimeEpoch": 1594334577796,
        "requestId": "75543606-06e0-433e-8966-1559fa80e88c",
        "identity": {
            "cognitoIdentityPoolId": null,
            "accountId": null,
            "cognitoIdentityId": null,
            "caller": null,
            "sourceIp": "136.32.196.195",
            "principalOrgId": null,
            "accessKey": null,
            "cognitoAuthenticationType": null,
            "cognitoAuthenticationProvider": null,
            "userArn": null,
            "userAgent": "PostmanRuntime/7.26.1",
            "user": null
        },
        "domainName": "0dgcwbc735.execute-api.us-east-1.amazonaws.com",
        "apiId": "0dgcwbc735"
    },
    "body": "{\"query\":\"mutation createUser($createInput: CreateUserInput!){\\r\\n  createUser(input: $createInput) {\\r\\n    id\\r\\n  }\\r\\n}\",\"variables\":{\r\n  \"createInput\": {\r\n    \"name\": \"Test7\"\r\n  }\r\n}}",
    "isBase64Encoded": false
}