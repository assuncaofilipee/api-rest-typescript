import { EntityManager, EntityNotFoundError, Repository } from 'typeorm';
import testDbDefaultManager from '../../../testDbDefaultManager';
import clearDatabase from '../../../helpers/clearDatabase';
import { Video } from '../../../../src/domain/entities/video';
import VideoRepositoryInterface from '../../../../src/domain/interfaces/repositories/videoRepositoryInterface';
import videoFactory from '../../../factories/videoFactory';
import VideoRepository from '../../../../src/infrastructure/data/repositories/videoRepository';
import { Course } from '../../../../src/domain/entities/course';
import courseFactory from '../../../factories/courseFactory';

describe('VideoRepository Testing', () => {
  let video: Video;
  let course: Course;
  let baseRepo: Repository<Video>;
  let courseRepo: Repository<Course>;
  let videoRepository: VideoRepositoryInterface;
  let manager: EntityManager;

  beforeAll(async () => {
    video = videoFactory.build();
    course = courseFactory.build();
    manager = await testDbDefaultManager();
    baseRepo = manager.getRepository(Video);
    courseRepo = manager.getRepository(Course);
    videoRepository = new VideoRepository(manager);
  });

  beforeEach(async () =>{
    await courseRepo.save(course);
    video.course = course;
    await baseRepo.save(video);
  });

  afterEach(async () => {
    await clearDatabase(manager);
  });

  afterAll(async () => {
    await manager.connection.destroy();
  });

  it('Should find video into internal database', async () => {
    const databaseObject = await videoRepository.find(10, 0);
    
    expect([video]).toMatchObject(databaseObject[0]);
  });
  it('Should find video by id into internal database', async () => {
    const databaseObject = await videoRepository.findOneById(video.id!);

    expect(databaseObject!.id).toBe(video.id);
  });

  it('Should update a video into internal database', async () => {
    video.title = 'new name';

    const databaseObject = await videoRepository.save(video);

    expect(databaseObject!.title).toBe(video.title);
  });

  it('Should create a video into internal database', async () => {
    const databaseObject = await videoRepository.save(video);

    expect(databaseObject).toMatchObject(video);
  });

  it('Should soft delete a video into internal database', async () => {
    await videoRepository.delete(video.id);

    expect(videoRepository.findOneById(video.id!)).rejects.toThrow(
      EntityNotFoundError
    );
  });
});
