import { ScanResponse } from 'nestjs-dynamoose';
import { Test, TestingModule } from '@nestjs/testing';

import { User } from '../model/user.model';
import { UserStatus } from '../model/user.enum';
import { UserController } from './user.controller';
import { UserService } from '../service/user.service';
import { UserTestImports } from '../test/user-test.imports';
import { UpdateUserInput } from '../model/update-user.input';
import { DefaultQueryInput } from 'src/common/model/query.input';

let controller: UserController;

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: UserTestImports,
    providers: [UserService],
    controllers: [UserController],
  }).compile();

  controller = module.get<UserController>(UserController);
});

describe('User Controller', () => {
  it('create - create user', async () => {
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

    const result = await controller.create(userInput);
    expect(result).toBe(userInput)

    spy.mockRestore()
  });

  it('getUser - find all (scan)', async () => {
    const spy = jest.spyOn(UserService.prototype, 'findAll')
      .mockImplementation(() => {
        return [{ id: 'backend-test-user-id', name: 'Backend test #1', status: UserStatus.Active }] as any
      })

    const input: DefaultQueryInput = {
      limit: 6
    }

    const users = await controller.findAll(input);
    expect(users).toBeDefined();
    expect((users as ScanResponse<User>).length).toBe(1);

    spy.mockRestore()
  });

  it('findByName - find by name (bad request)', async () => {
    try {
      await controller.findByName({ name: 'Backend test #1' });
    } catch (e) {
      expect(e).toMatchObject({ status: 400 });
    }
  });

  it('findByName - returning results', async () => {
    const spy = jest.spyOn(UserService.prototype, 'findByName')
      .mockImplementation(() => {
        return [{ name: 'Backend test #1' }] as any
      })

    const result = await controller.findByName({ name: 'Backend test #1' });
    expect(result).toHaveLength(1);

    spy.mockRestore()
  });

  it('findByName - not returning results', async () => {
    const spy = jest.spyOn(UserService.prototype, 'findByName')
      .mockImplementation(() => {
        return [] as any
      })

    expect(await controller.findByName({ name: 'Backend test #100' })).toHaveLength(0);
    expect(await controller.findByName({ name: 'Backend test #100' })).toHaveLength(0);

    spy.mockRestore()
  });

  it('update - update status to deleted', async () => {
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

    const updated = await controller.update('backend-test-user-id', {
      ...user,
      name: 'Backend test #1 UPDATED',
    });

    expect(updated).toBeDefined();
    expect(updated.name).toBe('Backend test #1 UPDATED')

    spy.mockRestore()
  });

  it('delete - delete user', async () => {
    const spy = jest.spyOn(UserService.prototype, 'delete')
      .mockImplementation();

    const deletedOperation = await controller.delete('backend-test-user-id');
    expect(deletedOperation).toBeUndefined();

    spy.mockRestore()
  });
});
