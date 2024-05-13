import { EntityManager, EntityNotFoundError, Repository } from 'typeorm';
import testDbDefaultManager from '../../../testDbDefaultManager';
import clearDatabase from '../../../helpers/clearDatabase';
import CourseRepository from '../../../../src/infrastructure/data/repositories/courseRepository';
import { Course } from '../../../../src/domain/entities/course';
import CourseRepositoryInterface from '../../../../src/domain/interfaces/repositories/courseRepositoryInterface';
import courseFactory from '../../../factories/courseFactory';

describe('SubjectRepository Testing', () => {
  let course: Course;
  let baseRepo: Repository<Course>;
  let courseRepository: CourseRepositoryInterface;
  let manager: EntityManager;

  beforeAll(async () => {
    course = courseFactory.build();
    manager = await testDbDefaultManager();
    baseRepo = manager.getRepository(Course);
    courseRepository = new CourseRepository(manager);
  });

  beforeEach(async () => {
    await baseRepo.save(course);
  });

  afterEach(async () => {
    await clearDatabase(manager);
  });

  afterAll(async () => {
    await manager.connection.destroy();
  });

  it('Should find course into internal database', async () => {
    const databaseObject = await courseRepository.find(10, 0);
    
    expect(databaseObject[0]).toMatchObject([course])
  });
  it('Should find course by id into internal database', async () => {
    const databaseObject = await courseRepository.findOneById(course.id!);

    expect(databaseObject!.id).toBe(course.id);
  });

  it('Should update a course into internal database', async () => {
    course.name = 'new name';

    const databaseObject = await courseRepository.save(course);

    expect(databaseObject!.name).toBe(course.name);
  });

  it('Should create a course into internal database', async () => {
    const databaseObject = await courseRepository.save(course);

    expect(databaseObject).toMatchObject(course);
  });

  it('Should soft delete a course into internal database', async () => {
    await courseRepository.delete(course.id);

    expect(courseRepository.findOneById(course.id!)).rejects.toThrow(
      EntityNotFoundError
    );
  });
});
