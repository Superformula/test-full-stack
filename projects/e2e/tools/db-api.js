const users = require('./seed-data-source');
const AWS = require('aws-sdk');

//https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#batchWriteItem-property

const TABLE_NAME = 'Users-Dev';

const ACCESS_KEY_ID = process.env['CONFIG_ACCESS_KEY_ID'];
const SECRET_ACCESS_KEY = process.env['CONFIG_SECRET_KEY'];

if (!ACCESS_KEY_ID || !SECRET_ACCESS_KEY) {
    throw new Error("You must specify CONFIG_ACCESS_KEY_ID and CONFIG_SECRET_KEY environment variables");
}

var dynamodb = new AWS.DynamoDB({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    region: 'us-east-1',
});

async function deleteTable() {
    return new Promise((resolve, reject) => {
        dynamodb.deleteTable({
            TableName: TABLE_NAME
        }, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}

async function createTable() {
    return new Promise((resolve, reject) => {
        dynamodb.createTable({
            TableName: TABLE_NAME,
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1
            },
            KeySchema: [
                {
                    AttributeName: 'id',
                    KeyType: 'HASH'
                },
            ],
            AttributeDefinitions: [
                {
                    AttributeName: 'id',
                    AttributeType: 'S'
                },
            ]
        }, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}

async function uploadUsers() {
    return new Promise((resolve, reject) => {
        dynamodb.batchWriteItem({
            RequestItems: {
                [TABLE_NAME]: users.users.map((user) => {
                    return {
                        PutRequest: {
                            Item: {
                                id: {
                                    S: user.id
                                },
                                createdAt: {
                                    N: user.createdAt.toString()
                                },
                                name: {
                                    S: user.name
                                },
                                description: {
                                    S: user.description
                                },
                                address: {
                                    S: user.address
                                }
                            }
                        }
                    };
                })
            } 
        }, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}

module.exports = {
    createTable,
    deleteTable,
    uploadUsers
}