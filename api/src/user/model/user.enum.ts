import { registerEnumType } from '@nestjs/graphql';

enum UserStatus {
  Active = 'Active',
  Deleted = 'Deleted',
}

registerEnumType(UserStatus, {
  name: 'UserStatus',
});

export { UserStatus };
