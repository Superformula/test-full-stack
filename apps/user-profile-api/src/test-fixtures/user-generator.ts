import * as f from 'factory.ts';
import * as faker from 'faker';
import { v4 as uuidV4 } from 'uuid';
import { User } from '../graphql/user';
import { randAddressGen, randAlphaGen, randPastLocalDateGen, randPastTimestampGen } from './rand-util';

export const randNameGen = (): f.Sync.Generator<string> => f.each(() => `${faker.name.firstName()} ${faker.name.lastName()}`);

export const uuidGen = (): f.Sync.Generator<string> => f.each(() => uuidV4());

export const resInvAllocationByExternalIdInputFactory = f.Sync.makeFactory<User>({
  id: uuidGen(),
  name: randNameGen(),
  description: randAlphaGen(),
  dob: randPastLocalDateGen(50),
  address: randAddressGen(),
  createdAt: randPastTimestampGen(2, 1),
  updatedAt: randPastTimestampGen(1),
});
