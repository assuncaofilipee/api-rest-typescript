import SubjectRepositoryInterface from '../../src/domain/interfaces/repositories/subjectRepositoryInterface';

export default (): SubjectRepositoryInterface => ({
  find: jest.fn(),
  save: jest.fn(),
  findOneById: jest.fn(),
  delete: jest.fn()
});
