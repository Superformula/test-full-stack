const https = require('https');
const { client: { getClient } } = require('../../common/dynamodb')

const TABLE_NAME = process.env.DYNAMODB_TABLE
const MAPBOX_HOST = process.env.MAPBOX_HOST
const MAPBOX_PORT = process.env.MAPBOX_PORT
const ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN

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
        port: MAPBOX_PORT,
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
