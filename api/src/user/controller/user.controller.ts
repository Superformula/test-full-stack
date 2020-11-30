import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';

import { UserService } from '../service/user.service';
import { CreateUserInput } from '../model/create-user.input';
import { UpdateUserInput } from '../model/update-user.input';
import { GetUserInput } from '../model/get-user.input';
import { DefaultQueryInput } from '../../common/model/query.input';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() body: CreateUserInput) {
    return this.userService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateUserInput) {
    return this.userService.update({ id }, body);
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return this.userService.find({ id });
  }

  @Get()
  findAll(@Body() body: DefaultQueryInput) {
    return this.userService.findAll(body);
  }

  @Get()
  findByName(@Body() body: GetUserInput) {
    if (!body.name) throw new BadRequestException();

    return this.userService.findByName(body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete({ id });
  }
}
