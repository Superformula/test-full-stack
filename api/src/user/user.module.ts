import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';

import { UserSchema } from './schema/user.schema';
import { UserService } from './service/user.service';
import { UserResolver } from './resolver/user.resolver';
import { UserController } from './controller/user.controller';

@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: 'user',
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UserService, UserResolver, UserService],
  controllers: [UserController, UserController],
})
export class UserModule {}
