// https://dynamoosejs.com/
import * as dynamoose from "dynamoose";
import { configApiHost, configApiKey } from "./config";


const dynamo = new dynamoose.aws.sdk.DynamoDB({
    accessKeyId: configApiHost,
    secretAccessKey: configApiKey,
    region: "us-east-1"
});

// I may be able to better enforce the types.
// type SchemaType = {
//     [P in keyof UserModelGql]: any;
// };

dynamoose.aws.ddb.set(dynamo);
export const UserSchema = new dynamoose.Schema({
    "id": {
        "type": String,
        "required": true
    },
    "name": {
        "type": String,
        "required": true,
    },
    "dob": String,
    "address": String,
    "description": String,
    "createdAt": Number,
    "updatedAt": Number
}, {
    "timestamps": false
});

export const UserModel = dynamoose.model("Users-Dev", UserSchema, {
    create: true // If the table doesn't exist, then create it.
});
