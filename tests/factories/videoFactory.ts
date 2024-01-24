import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';
import { Video } from '../../src/domain/entities/video';
import courseFactory from './courseFactory';

export default Factory.define<Video>(() => {
  return {
    id: faker.string.uuid(),
    title: faker.string.alpha(5),
    url: faker.string.alpha(5),
    course: courseFactory.build(),
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime()
  };
});
