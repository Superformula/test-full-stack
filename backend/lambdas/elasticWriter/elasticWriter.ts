import AWS from 'aws-sdk';
import { DynamoDBStreamEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import path from 'path';
import stream from 'stream';
import { ActionType, LooseObject } from './types';

const esDomain = {
  endpoint: process.env.ES_ENDPOINT,
  region: process.env.ES_REGION,
  index: 'id',
  doctype: 'user',
};

function postDocumentToES(doc: string, endpointUrl: string, region: string): Promise<void> {
  const endpoint = new AWS.Endpoint(endpointUrl);
  const creds = new AWS.EnvironmentCredentials('AWS');

  //[TECHNICAL DEBT] I don't know about you, but I want to wash my eyes after seeing some many "any"s below. But because the APIs
  //needed to make this request are not explicitly typed by AWS, I explicitly added "any" types. I also understand
  //using private SDK APIs in PROD is not ideal because the teams creating won't prioritize public retro-compatibility.
  //With that said, I still used them and "any'd" the hell of the code with because:
  //  1. This wont be used in production.
  //  2. There will be plenty of opportunities elsewhere in the code to demonstrate my TS skills
  //  3. Time is short and I want to implement as many interesting things as I can in this project :)

  //TODO: Apply Strangler Pattern (sort of) on the code below to facilitate refactoring this out later

  //@ts-ignore
  const req = new AWS.HttpRequest(endpoint);

  req.method = 'POST';
  req.path = '/_bulk';
  (req as any).region = region;
  req.body = doc;
  (req as any).headers['presigned-expires'] = false;
  req.headers['Host'] = endpoint.host;

  // Sign the request (Sigv4)
  var signer = new (AWS as any).Signers.V4(req, 'es');
  signer.addAuthorization(creds, new Date());

  return new Promise<void>((resolve, reject) => {
    // Post document to ES
    const send = new (AWS as any).NodeHttpClient();

    send.handleRequest(
      req,
      null,
      function (httpResp: any) {
        let body = '';
        httpResp.on('data', function (chunk: any) {
          body += chunk;
        });
        httpResp.on('end', function (chunk: any) {
          console.log('Received response:', body);

          try {
            const data = JSON.parse(body);
            if (data.errors || data.error) {
              console.error('Elastic search responded with errors');
              reject(`Elastic search responded with errors ${body}`);
              return;
            }
          } catch (e) {
            console.error('Could not determine if ElasticSearch was successfully reconciled', e, body);
            reject(`Could not determine if ElasticSearch was successfully reconciled. Raw response: ${body}`);
          }
        });
      },
      function (err: any) {
        console.log('Error: ' + err);
        reject('Error: ' + err);
      },
    );
  });
}

export const handler = async (event: DynamoDBStreamEvent, context: Context, callback: any) => {
  if (!esDomain.endpoint || !esDomain.region) {
    console.error('Mandatory environment variables have not been properly initialized');
    throw new Error(
      `Mandatory environment variables have not been properly initialized. Endpoint initialized: ${!!esDomain.endpoint}. Domain initialized: ${!!esDomain.region}`,
    );
  }

  console.log('event => ' + JSON.stringify(event));
  let users = '';

  //TODO: Infer dynamodb type using discriminator
  for (let i = 0; i < event.Records.length; i++) {
    let actionType: ActionType | null = null;
    let image;
    switch (event.Records[i].eventName) {
      case 'INSERT':
        actionType = 'create';
        image = (event.Records[i].dynamodb as any).NewImage;
        break;
      case 'MODIFY':
        actionType = 'update';
        image = (event.Records[i].dynamodb as any).NewImage;
        break;
      case 'REMOVE':
        actionType = 'delete';
        image = (event.Records[i].dynamodb as any).OldImage;
        break;
    }

    if (typeof image !== 'undefined' && actionType) {
      const userData: LooseObject = {};
      for (let key in image) {
        if (image.hasOwnProperty(key)) {
          const val = image[key];
          if (val.hasOwnProperty('S')) {
            userData[key] = val.S;
          } else if (val.hasOwnProperty('N')) {
            //Numbers are sent across the wire from MongoDB as strings. Convert to number
            userData[key] = Number(val.N);
          }
        }
      }

      const action: LooseObject = {};
      action[actionType] = {};
      action[actionType]._index = 'id';
      action[actionType]._type = 'user';
      action[actionType]._id = userData['id'];

      let doc: any[] = [];
      if (actionType === 'update') {
        const wrapper = { doc: userData };
        doc = [JSON.stringify(wrapper)];
      } else if (actionType === 'create') {
        doc = [JSON.stringify(userData)];
      }

      users += [JSON.stringify(action)].concat(doc).join('\n') + '\n';
    }
  }
  console.log('users:', users);
  await postDocumentToES(users, esDomain.endpoint, esDomain.region);
};
