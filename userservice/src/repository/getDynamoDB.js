import Dynamodb from "aws-sdk/clients/dynamodb";

export const getDynamoDb = () => {
  if (process.env.DYNAMODB_LOCAL) {
    return new Dynamodb.DocumentClient({
      region: "localhost",
      endpoint: "http://localhost:8000",
    });
  } else {
    return new Dynamodb.DocumentClient({ region: "us-east-1" });
  }
};

export const getTableName = () => {
  return process.env.USER_TABLE;
};
