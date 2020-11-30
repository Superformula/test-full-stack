import * as uuid from 'uuid';
import { Injectable } from '@nestjs/common';
import { InjectModel, Model, QueryResponse, ScanResponse } from 'nestjs-dynamoose';

import { UserStatus } from '../model/user.enum';
import { User, UserKey } from '../model/user.model';
import { CreateUserInput } from '../model/create-user.input';
import { UpdateUserInput } from '../model/update-user.input';
import { GetUserInput } from '../model/get-user.input';
import { ErrorResponse } from 'src/common/model/error-response';
import { DefaultQueryInput } from 'src/common/model/query.input';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user')
    private readonly model: Model<User, UserKey>) { }

  public async create(input: CreateUserInput) {
    return await this.model.create({
      ...input,
      id: uuid.v4(),
      status: UserStatus.Active,
      createdAt: new Date().toISOString(),
      updatedAt: ''
    });
  }

  public async update(key: UserKey, input: UpdateUserInput) {
    return await this.model.update(key, { ...input, updatedAt: new Date().toISOString() });
  }

  public async find(key: UserKey) {
    return await this.model.get(key);
  }

  public async findAll(input: DefaultQueryInput): Promise<ScanResponse<User> | ErrorResponse> {
    try {
      if (input.page) input.limit = input.page * input.limit;

      const response = await this.model
        .scan()
        .limit(input.limit)
        .exec();

      return response;
    } catch (error) {
      console.log(error);
      return { error: true, msg: error.message };
    }
  }

  public async findByName(input: GetUserInput): Promise<QueryResponse<User> | ErrorResponse> {
    try {
      const response = await this.model
        .query('name')
        .eq(input.name)
        .where('status')
        .eq(UserStatus.Active)
        .exec();

      return response;
    } catch (error) {
      console.log(error)
      return { error: true, msg: error.message };
    }
  }

  public async delete(key: UserKey) {
    return await this.model.delete(key);
  }
}
