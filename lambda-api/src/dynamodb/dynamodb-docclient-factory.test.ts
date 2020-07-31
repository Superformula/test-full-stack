import { mocked } from 'ts-jest/utils';
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';

jest.mock('aws-sdk/lib/dynamodb/document_client', () => {
  return {
    DocumentClient: jest.fn().mockImplementation((_arg1?: unknown) => {
      return {} as DocumentClient;
    }),
  };
});

import {
  DynamoDocumentClientProvider,
  offlineDocumentClientConfig,
} from './dynamodb-docclient-factory';

describe('Document client factory unit tests', () => {
  const MockedDocumentClient = mocked(DocumentClient, true);

  beforeEach(() => {
    MockedDocumentClient.mockClear();
    MockedDocumentClient.mockClear();
  });

  it('OFFLINE client', async () => {
    process.env.IS_OFFLINE = 'true';

    new DynamoDocumentClientProvider().get();

    expect(MockedDocumentClient).toHaveBeenCalledWith(
      offlineDocumentClientConfig
    );
  });

  it('Online client', async () => {
    new DynamoDocumentClientProvider().get();

    expect(MockedDocumentClient).toBeCalledWith(undefined);
  });
});
