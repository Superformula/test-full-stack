import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';
import { Service, Token } from 'typedi';
import { createContextLogger } from '../logging/logger';
import * as AWS from 'aws-sdk';
import { Provider } from '../types';

const CONFIG_DYNAMODB_ENDPOINT = process.env.CONFIG_DYNAMODB_ENDPOINT;
const IS_OFFLINE = process.env.IS_OFFLINE;

const log = createContextLogger({ appModule: 'DynamoDBConfig' });

export const DynamoDocumentClientProviderComponent = new Token<
  'DynamoDocumentClientProvider'
>();

export const offlineDocumentClientConfig = {
  region: 'localhost',
  endpoint: CONFIG_DYNAMODB_ENDPOINT,
  accessKeyId: 'DEFAULT_ACCESS_KEY',
  secretAccessKey: 'DEFAULT_SECRET',
};

@Service(DynamoDocumentClientProviderComponent)
export class DynamoDocumentClientProvider implements Provider<DocumentClient> {
  private documentClient: DocumentClient;

  public get(): DocumentClient {
    if (!this.documentClient) {
      if (IS_OFFLINE === 'true') {
        log.info('DynamoDB client configured for serverless offline mode');
        this.documentClient = new AWS.DynamoDB.DocumentClient(
          offlineDocumentClientConfig
        );
      } else {
        log.info('DynamoDB client configured for normal mode');
        this.documentClient = new AWS.DynamoDB.DocumentClient();
      }
    }

    return this.documentClient;
  }
}
