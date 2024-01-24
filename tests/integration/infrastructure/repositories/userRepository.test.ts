import { EntityManager, EntityNotFoundError, Repository } from 'typeorm';
import testDbDefaultManager from '../../../testDbDefaultManager';
import clearDatabase from '../../../helpers/clearDatabase';
import { User } from '../../../../src/domain/entities/user';
import UserRepositoryInterface from '../../../../src/domain/interfaces/repositories/userRepositoryInterface';
import userFactory from '../../../factories/userFactory';
import UserRepository from '../../../../src/infrastructure/data/repositories/userRepository';

describe('UserRepository Testing', () => {
  let user: User;
  let baseRepo: Repository<User>;
  let userRepository: UserRepositoryInterface;
  let manager: EntityManager;

  beforeAll(async () => {
    user = userFactory.build();
    manager = await testDbDefaultManager();
    baseRepo = manager.getRepository(User);
    userRepository = new UserRepository(manager);
  });
  
  beforeEach(async () => {
    await baseRepo.save(user);
  });

  afterEach(async () => {
    await clearDatabase(manager);
  });

  afterAll(async () => {
    await manager.connection.destroy();
  });

  it('Should find user into internal database', async () => {
    const databaseObject = await userRepository.find(10, 0);
    
    expect([user]).toMatchObject(databaseObject[0]);
  });
  it('Should find user by email into internal database', async () => {
    const databaseObject = await userRepository.findOneByEmail(user.email!);

    expect(databaseObject!.id).toBe(user.id);
  });

  it('Should update a user into internal database', async () => {
    user.name = 'new name';

    const databaseObject = await userRepository.save(user);

    expect(databaseObject!.name).toBe(user.name);
  });

  it('Should create a user into internal database', async () => {
    const databaseObject = await userRepository.save(user);

    expect(databaseObject).toMatchObject(user);
  });

  it('Should soft delete a user into internal database', async () => {
    await userRepository.delete(user.id);

    expect(userRepository.findOneById(user.id!)).rejects.toThrow(
      EntityNotFoundError
    );
  });
});
