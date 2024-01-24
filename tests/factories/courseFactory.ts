import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';
import { Course } from '../../src/domain/entities/course';
import subjectFactory from './subjectFactory';
import videoFactory from './videoFactory';

export default Factory.define<Course>(() => {
  return {
    id: faker.string.uuid(),
    name: faker.string.alpha(5),
    description: faker.string.alpha(5),
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime()
  };
});
