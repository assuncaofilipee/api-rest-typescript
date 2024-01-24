import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';
import { User } from '../../src/domain/entities/user';

export default Factory.define<User>(() => {
  return {
    id: faker.string.uuid(),
    name: faker.string.alpha(5),
    email: faker.string.alpha(5),
    password: faker.string.alpha(5),
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
    hashPassowrd: jest.fn
  };
});
