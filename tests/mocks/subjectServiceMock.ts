import SubjectService from '../../src/application/services/subjectService';
import subjectRepositoryMock from './subjectRepositoryMock';

export default (): SubjectService => ({
  postgresSubjectRepository: subjectRepositoryMock(),
  find: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  findOneById: jest.fn(),
  delete: jest.fn()
});
