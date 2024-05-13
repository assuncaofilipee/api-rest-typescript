import { EntityManager, EntityNotFoundError, Repository } from 'typeorm';
import { Subject } from '../../../../src/domain/entities/subject';
import SubjectRepositoryInterface from '../../../../src/domain/interfaces/repositories/subjectRepositoryInterface';
import subjectFactory from '../../../factories/subjectFactory';
import testDbDefaultManager from '../../../testDbDefaultManager';
import SubjectRepository from '../../../../src/infrastructure/data/repositories/subjectRepository';
import clearDatabase from '../../../helpers/clearDatabase';

describe('SubjectRepository Testing', () => {
  let subject: Subject;
  let baseRepo: Repository<Subject>;
  let subjectRepository: SubjectRepositoryInterface;
  let manager: EntityManager;

  beforeAll(async () => {
    subject = subjectFactory.build();
    manager = await testDbDefaultManager();
    baseRepo = manager.getRepository(Subject);
    subjectRepository = new SubjectRepository(manager);
  });

  beforeEach(async () => {
    await baseRepo.save(subject);
  });

  afterEach(async () => {
    await clearDatabase(manager);
  });

  afterAll(async () => {
    await manager.connection.destroy();
  });

  it('Should find subject into internal database', async () => {
    const databaseObject = await subjectRepository.find(10, 0);
    
    expect(databaseObject[0]).toMatchObject([subject])
  });

  it('Should find subject by id into internal database', async () => {
    const databaseObject = await subjectRepository.findOneById(subject.id!);

    expect(databaseObject!.id).toBe(subject.id);
  });

  it('Should update a subject into internal database', async () => {
    subject.name = 'new name';

    const databaseObject = await subjectRepository.save(subject);

    expect(databaseObject!.name).toBe(subject.name);
  });

  it('Should create a subject into internal database', async () => {
    const databaseObject = await subjectRepository.save(subject);

    expect(databaseObject).toMatchObject(subject);
  });

  it('Should soft delete a subject into internal database', async () => {
    await subjectRepository.delete(subject.id);

    expect(subjectRepository.findOneById(subject.id!)).rejects.toThrow(
      EntityNotFoundError
    );
  });
});
