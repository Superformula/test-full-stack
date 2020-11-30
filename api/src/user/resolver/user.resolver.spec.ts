import { ScanResponse } from 'nestjs-dynamoose';
import { Test, TestingModule } from '@nestjs/testing';

import { User } from '../model/user.model';
import { UserResolver } from './user.resolver';
import { UserStatus } from '../model/user.enum';
import { UserService } from '../service/user.service';
import { UserTestImports } from '../test/user-test.imports';
import { UpdateUserInput } from '../model/update-user.input';
import { DefaultQueryInput } from 'src/common/model/query.input';

let resolver: UserResolver;

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: UserTestImports,
    providers: [UserResolver, UserService],
  }).compile();

  resolver = module.get<UserResolver>(UserResolver);
});

describe('User Resolver', () => {
  it('createUser - create user', async () => {
    const userInput = {
      'name': 'Backend test #1',
      'dob': '10/10/1980',
      'address': '1600 Pennsylvania Avenue NW  Washington, D.C. 20500 U.S.',
      'description': 'Description #1'
    }

    const spy = jest.spyOn(UserService.prototype, 'create')
      .mockImplementation(() => {
        return userInput as any
      })

    const result = await resolver.createUser(userInput);
    expect(result).toBe(userInput)

    spy.mockRestore()
  });

  it('findUser - returning results', async () => {
    const spy = jest.spyOn(UserService.prototype, 'findByName')
      .mockImplementation(() => {
        return [{ name: 'Backend test #1' }] as any
      })

    const result = await resolver.findUser({ name: 'Backend test #1' });
    expect(result).toHaveLength(1);

    spy.mockRestore()
  });

  it('findUser - not returning results', async () => {
    const spy = jest.spyOn(UserService.prototype, 'findByName')
      .mockImplementation(() => {
        return [] as any
      })

    expect(await resolver.findUser({ name: 'Backend test #100' })).toHaveLength(0);
    expect(await resolver.findUser({ name: 'Backend test #200' })).toHaveLength(0);

    spy.mockRestore()
  });

  it('updateUser - update status name', async () => {
    const user = {
      name: 'Backend test #1',
      dob: '10/10/2010',
      address: 'Address',
      description: 'Description',
      status: UserStatus.Active
    } as UpdateUserInput;

    const spy = jest.spyOn(UserService.prototype, 'update')
      .mockImplementation(() => {
        return { ...user, name: 'Backend test #1 UPDATED' } as any
      })

    const updated = await resolver.updateUser('backend-test-user-id', {
      ...user,
      name: 'Backend test #1 UPDATED',
    });

    expect(updated).toBeDefined();
    expect(updated.name).toBe('Backend test #1 UPDATED')

    spy.mockRestore()
  });

  it('getUser - find by id', async () => {
    const spy = jest.spyOn(UserService.prototype, 'find')
      .mockImplementation(() => {
        return { id: 'backend-test-user-id', name: 'Backend test #1', status: UserStatus.Active } as any
      })

    const user = await resolver.user('backend-test-user-id');
    expect(user).toBeDefined();
    expect(user.id).toBe('backend-test-user-id');

    spy.mockRestore()
  });

  it('listUsers - find all (scan)', async () => {
    const spy = jest.spyOn(UserService.prototype, 'findAll')
      .mockImplementation(() => {
        return [{ id: 'backend-test-user-id', name: 'Backend test #1', status: UserStatus.Active }] as any
      })

    const input: DefaultQueryInput = {
      limit: 6
    }

    const users = await resolver.listUsers(input);
    expect(users).toBeDefined();
    expect((users as ScanResponse<User>).length).toBe(1);

    spy.mockRestore()
  });

  it('deleteUser - delete user', async () => {
    const spy = jest.spyOn(UserService.prototype, 'delete')
      .mockImplementation();

    const deletedOperation = await resolver.deleteUser('backend-test-user-id');
    expect(deletedOperation).toBeUndefined();

    spy.mockRestore()
  });
});
