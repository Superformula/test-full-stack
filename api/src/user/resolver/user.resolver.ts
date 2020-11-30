import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { UpdateUserInput } from '../model/update-user.input';
import { CreateUserInput } from '../model/create-user.input';
import { GetUserInput } from '../model/get-user.input';
import { DefaultQueryInput } from '../../common/model/query.input';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Mutation(() => User)
  public createUser(@Args('input') input: CreateUserInput) {
    return this.userService.create(input);
  }

  @Mutation(() => User)
  public updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateUserInput) {
    return this.userService.update({ id }, input);
  }

  @Query(() => User)
  public user(@Args('id', { type: () => ID }) id: string) {
    return this.userService.find({ id });
  }

  @Query(() => [User])
  public findUser(@Args('input') input: GetUserInput) {
    return this.userService.findByName(input);
  }

  @Query(() => [User])
  public listUsers(@Args('input') input: DefaultQueryInput) {
    return this.userService.findAll(input);
  }

  @Mutation(() => User)
  public deleteUser(@Args('id') id: string) {
    return this.userService.delete({ id });
  }
}
