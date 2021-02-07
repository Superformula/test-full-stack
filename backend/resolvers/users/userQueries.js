const https = require('https');
const { client: { getClient } } = require('../../common/dynamodb')

// TODO: Change for process.env.TABLE_NAME
const TABLE_NAME = 'Users';
const DEFAULT_SSL_PORT = 443
const MAPBOX_HOST = 'api.mapbox.com'
const ACCESS_TOKEN = 'pk.eyJ1IjoiZmFsY29hZ3VzdGluIiwiYSI6ImNra3U2bGY3MDBzMzAyb3BoYWRobHI2N2EifQ.rLgsHWrt0sBpzN1D14SmvA'

const getUsers = (args) => {
  const { limit, lastKey, name } = args;
  if (!limit) {
    throw new Error('Invalid input field cannot be 0: [limit]')
  }

  let params = {
    TableName: TABLE_NAME,
    ExpressionAttributeValues: {
      ':name': name || ''
    },
    FilterExpression: 'contains (#name, :name)',
    ExpressionAttributeNames: { "#name": "name" },
    Limit: limit,
  };

  if (lastKey) {
    params = { ...params, ExclusiveStartKey: { id: lastKey } };
  }

  return getClient().scan(params)
    .promise()
    .then(result => {
      return {
        data: result.Items,
        lastKey: result.LastEvaluatedKey ? result.LastEvaluatedKey['id'] : null
      }
    })
    .catch(error => {
      throw new Error('Something bad happened: ' + error)
    })
};

const getUserLocation = (args) => {
  const { id } = args
  const params = {
    TableName: TABLE_NAME,
    Key: { id }
  };
  return getClient().get(params)
    .promise()
    .then(res => {
      if (!res.Item) {
        throw new Error('User id provided does not exist')
      }
      const { address } = res.Item
      const options = {
        hostname: MAPBOX_HOST,
        port: DEFAULT_SSL_PORT,
        path: `/geocoding/v5/mapbox.places/${encodeURI(address)}.json?access_token=${ACCESS_TOKEN}`,
        method: 'GET'
      };
      return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
          console.log('Received mapbox request with code: ' + res.statusCode)
          if (res.statusCode !== 200) {
            reject(new Error('Something bad has happened: ' + res.statusMessage))
          }
          let body = [];

          res.on('data', function(chunk) {
            body.push(chunk);
          });

          res.on('end', function() {
            try {
              body = JSON.parse(Buffer.concat(body).toString());
            } catch(e) {
              reject('Received a bad JSON from MapBox response');
            }
            console.log('Parsed Body' + JSON.stringify(body))
            resolve(body);
          });
        });
        req.end()
      }).then(r => {
        console.log('Result from mapbox resolved correctly with value: ' + JSON.stringify(r))
        return r['features']
      })
        .catch(error => {
          throw new Error('Something bad has happened ' + error)
        })

    })
}

exports.userQueries = {
  getUsers,
  getUserLocation
}
