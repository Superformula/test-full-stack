import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DynamooseModule } from 'nestjs-dynamoose';

import { UserModule } from './user/user.module';

export const dynamooseConfiguration = {
  local: process.env.IS_DDB_LOCAL === 'true',
  aws: { region: process.env.REGION }
}

export const graphQLConfiguration = {
  autoSchemaFile: true,
  playground: {
    endpoint:
      process.env.IS_NOT_SLS === 'true'
        ? '/graphql'
        : `/${process.env.STAGE}/graphql`,
  },
}

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot(graphQLConfiguration),
    DynamooseModule.forRoot(dynamooseConfiguration),

    UserModule,
  ],
})
export class AppModule { }
