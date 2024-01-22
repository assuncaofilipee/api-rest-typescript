import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';
import { Subject } from '../../src/domain/entities/subject';

export default Factory.define<Subject>(() => {
  return {
    id: faker.string.uuid(),
    name: faker.string.alpha(5),
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime()
  }
});
