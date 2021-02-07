const { getRandomHash } = require('../common/hash');
const { utils: { setupMockClient, resetMockClient } } = require('./utils');
const { userQueries: { getUsers }} = require('../resolvers/users/userQueries');

describe('test get user functionality', () => {
  beforeEach(() => {
    resetMockClient();
  });

  test('gets all users successfully', () => {
    const id = getRandomHash();
    setupMockClient('scan', { Items: [ { id }]})

    return getUsers({ limit: 10 })
      .then(r => {
        expect(r.data[0].id).toBe(id)
      })
  });

  test('validate input is invalid', () => {
    expect(() => {
      return getUsers({ limit: 0 })
    }).toThrow(Error);
  });

  test('gets users last key for pagination', () => {
    const lastKey = getRandomHash();
    setupMockClient('scan',{
      Items: [ { id: getRandomHash() }, { id: lastKey }], LastEvaluatedKey: { id: lastKey }
    })

    return getUsers({ limit: 2 })
      .then(r => {
        expect(r.lastKey).toBe(lastKey)
      })
  })
});
