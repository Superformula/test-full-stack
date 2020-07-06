import Dynamodb from "aws-sdk/clients/dynamodb";

export const getDynamoDb = () => {
  return new Dynamodb.DocumentClient({ region: "us-east-1" });
};

export const getTableName = () => {
  return process.env.USER_TABLE;
};
