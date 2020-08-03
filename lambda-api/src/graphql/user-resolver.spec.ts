import { any, anyObject, mock, mockReset } from 'jest-mock-extended';
const mockLogger = mock<Logger>();
jest.mock('../logging/logger', () => ({
  createContextLogger: (_ctx) => mockLogger,
  toMeta: jest.requireActual('../logging/logger').toMeta,
}));
import { Logger } from 'winston';
import { UserDal } from '../dal/user-dal';
import { userFactory } from '../test-fixtures/user-generator';
import { CreateUserInput } from './create-user-input';
import { PageRequest } from './page-request';
import { PagedUserResult } from './paged-user-result';
import { UpdateUserInput } from './update-user-input';
import { UserResolver } from './user-resolver';
import { UserSearchCriteria } from './user-search-criteria';

describe('UserResolver tests', () => {
  const mockUserDal = mock<UserDal>();
  const tested = new UserResolver(mockUserDal);
  const users = userFactory.buildList(5);
  const user = users[0];
  const error = 'Boom goes the dynamite!';
  const resPage = {
    values: users,
    isLastPage: false,
    cursor: 'abc123',
    count: users.length,
  } as PagedUserResult;

  beforeEach(() => {
    mockReset(mockLogger);
    mockReset(mockUserDal);
  });

  it('users happy path no params', async () => {
    mockUserDal.find.calledWith(any(), any()).mockResolvedValueOnce(resPage);

    const res = await tested.users(undefined, undefined);

    expect(res.values).toEqual(users);
  });

  it('users happy path', async () => {
    const searchInput = { name: 'joe smith' } as UserSearchCriteria;
    const pageInput = { limit: 30, cursor: 'abc123' } as PageRequest;
    mockUserDal.find
      .calledWith(searchInput, pageInput)
      .mockResolvedValueOnce(resPage);

    const res = await tested.users(searchInput, pageInput);

    expect(res.values).toEqual(users);
  });

  it('users error during user dal call', async () => {
    const searchInput = { name: 'joe smith' } as UserSearchCriteria;
    const pageInput = { limit: 30, cursor: 'abc123' } as PageRequest;
    mockUserDal.find
      .calledWith(searchInput, pageInput)
      .mockRejectedValueOnce(new Error(error));

    try {
      await tested.users(searchInput, pageInput);
    } catch (e) {
      expect(e.message).toEqual(error);
    }
    expect(mockLogger.error).toHaveBeenCalledWith(
      expect.stringContaining(
        `Error finding users searchCriteria: ${JSON.stringify(
          searchInput
        )} pageRequest: ${JSON.stringify(pageInput)}`
      ),
      any()
    );
  });

  it('user happy path', async () => {
    const input = user.id;
    mockUserDal.findOne.calledWith(input).mockResolvedValueOnce(user);

    const res = await tested.user(input);

    expect(res).toEqual(user);
  });

  it('user error during user dal call', async () => {
    const input = user.id;
    mockUserDal.findOne
      .calledWith(input)
      .mockRejectedValueOnce(new Error(error));

    try {
      await tested.user(input);
    } catch (e) {
      expect(e.message).toEqual(error);
    }
    expect(mockLogger.error).toHaveBeenCalledWith(
      expect.stringContaining('Error finding user by id ' + input),
      anyObject()
    );
  });

  it('createUser happy path', async () => {
    const input = { ...user } as CreateUserInput;
    mockUserDal.create.calledWith(input).mockResolvedValueOnce(user);

    const res = await tested.createUser(input);

    expect(res).toEqual(user);
  });

  it('createUser error during user dal call', async () => {
    const input = { ...user } as CreateUserInput;
    mockUserDal.create
      .calledWith(input)
      .mockRejectedValueOnce(new Error(error));

    try {
      await tested.createUser(input);
    } catch (e) {
      expect(e.message).toEqual(error);
    }
    expect(mockLogger.error).toHaveBeenCalledWith(
      expect.stringContaining('Error creating user'),
      anyObject()
    );
  });

  it('udpateUser happy path', async () => {
    const input = { ...user } as UpdateUserInput;
    mockUserDal.update.calledWith(input).mockResolvedValueOnce(user);

    const res = await tested.updateUser(input);

    expect(res).toEqual(user);
  });

  it('udpateUser error during user dal call', async () => {
    const input = { ...user } as UpdateUserInput;
    mockUserDal.update
      .calledWith(input)
      .mockRejectedValueOnce(new Error(error));

    try {
      await tested.updateUser(input);
    } catch (e) {
      expect(e.message).toEqual(error);
    }
    expect(mockLogger.error).toHaveBeenCalledWith(
      expect.stringContaining('Error updating user'),
      anyObject()
    );
  });

  it('deleteUser happy path', async () => {
    const input = user.id;
    mockUserDal.delete.calledWith(input).mockResolvedValueOnce(true);

    const res = await tested.deleteUser(input);

    expect(res).toEqual({ value: true });
  });

  it('deleteUser error during user dal call', async () => {
    const input = user.id;
    mockUserDal.delete
      .calledWith(input)
      .mockRejectedValueOnce(new Error(error));

    try {
      await tested.deleteUser(input);
    } catch (e) {
      expect(e.message).toEqual(error);
    }
    expect(mockLogger.error).toHaveBeenCalledWith(
      expect.stringContaining('Error deleting user'),
      anyObject()
    );
  });
});
