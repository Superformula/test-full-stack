import { Schema } from 'dynamoose';

export const UserSchema = new Schema({
  id: {
    type: String,
    hashKey: true,
  },
  name: {
    type: String,
    index: {
      global: true,
      rangeKey: 'status',
    },
  },
  dob: {
    type: String,
  },
  address: {
    type: String,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: String,
  },
  updatedAt: {
    type: String,
  },
  status: {
    type: String,
  },
});
