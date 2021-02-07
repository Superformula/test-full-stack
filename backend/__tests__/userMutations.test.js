const { ValidationError } = require('../common/resolverErrors')
const { utils: { setupMockClient, resetMockClient } } = require('./utils');
const { userMutations: { createUser, deleteUser, updateUser } } = require('../resolvers/users/userMutations');

const DEFAULT_TEST_USER = {
  name: 'test',
  dob: '10-02-2020',
  address: 'Los Angeles',
  description: 'A great user'
}

describe('test create user functionality', () => {
  beforeEach(() => {
    resetMockClient();
  });

  test('creates user successfully', () => {
    setupMockClient('put', {})

    return createUser(DEFAULT_TEST_USER)
      .then(r => {
        expect(r).not.toBe(null)
      })
  });

  test('validate create user with invalid name', () => {
    expect(() => {
      createUser({ ...DEFAULT_TEST_USER, name: '' })
    }).toThrow(ValidationError)
  });

  test('validate create user with invalid address', () => {
    expect(() => {
      createUser({ ...DEFAULT_TEST_USER, address: '' })
    }).toThrow(ValidationError)
  });

  test('validate create user with invalid description', () => {
    expect(() => {
      createUser({ ...DEFAULT_TEST_USER, description: '' })
    }).toThrow(ValidationError)
  });

  test('validate create user with invalid date of birth format', () => {
    expect(() => {
      createUser({ ...DEFAULT_TEST_USER, dob: '10-10-2020' })
    }).toThrow(ValidationError)

    expect(() => {
      createUser({ ...DEFAULT_TEST_USER, dob: '10 Oct 2020' })
    }).toThrow(ValidationError)

    expect(() => {
      createUser({ ...DEFAULT_TEST_USER, dob: 'A real unexpected date' })
    }).toThrow(ValidationError)
  });
});

describe('test update user functionality', () => {
  beforeEach(() => {
    resetMockClient();
  });

  test('update user successfully', () => {
    setupMockClient('update', {})
    return updateUser(DEFAULT_TEST_USER)
      .then(r => {
        expect(r).toBeTruthy()
      })
  });

  test('validate update user with invalid name', () => {
    expect(() => {
      updateUser({ ...DEFAULT_TEST_USER, name: '' })
    }).toThrow(ValidationError)
  });

  test('validate update user with invalid address', () => {
    expect(() => {
      updateUser({ ...DEFAULT_TEST_USER, address: '' })
    }).toThrow(ValidationError)
  });

  test('validate update user with invalid description', () => {
    expect(() => {
      updateUser({ ...DEFAULT_TEST_USER, description: '' })
    }).toThrow(ValidationError)
  });

  test('update user with non existing id', () => {
    setupMockClient('update', {}, () => new Error('User does not exists'))
    expect(() => {
      updateUser({ ...DEFAULT_TEST_USER, description: '' })
    }).toThrow(ValidationError)
  });
});

describe('test delete user functionality', () => {
  beforeEach(() => {
    resetMockClient();
  });

  test('deletes user successfully', () => {
    setupMockClient('delete', {})
    return deleteUser({ id: 'test' })
      .then(r => {
        expect(r).toBeTruthy()
      })
  });
});
