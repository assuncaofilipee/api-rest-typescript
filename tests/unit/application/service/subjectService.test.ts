import SubjectService from '../../../../src/application/services/subjectService';
import { Subject } from '../../../../src/domain/entities/subject';
import SubjectRepositoryInterface from '../../../../src/domain/interfaces/repositories/subjectRepositoryInterface';
import subjectFactory from '../../../factories/subjectFactory';
import subjectRepositoryMock from '../../../mocks/subjectRepositoryMock';

describe('SubjectService testing', () => {
  let subjectService: SubjectService;
  let subjectRepository: SubjectRepositoryInterface;

  beforeEach(() => {
    subjectRepository = subjectRepositoryMock();
    subjectService = new SubjectService(subjectRepository);
  });

  afterEach(() => {});

  it('Should find all subjects', async () => {
    const expected: Subject[] = subjectFactory.buildList(2);

    jest.spyOn(subjectRepository, 'find').mockResolvedValue([expected, 2]);

    const result = await subjectService.find(10, 0);

    expect(subjectRepository.find).toHaveBeenCalledTimes(1);
    expect(result.subjects).toBe(expected);
    expect(result.pagination.totalRecords).toBe(2);
  });

  it('Should save subject', async () => {
    const expected: Subject = subjectFactory.build();

    jest.spyOn(subjectRepository, 'save').mockResolvedValue(expected);

    const result = await subjectService.save(expected);
    expect(result).toBe(expected);
  });

  it('Should update subject', async () => {
    const subject: Subject = subjectFactory.build();

    jest.spyOn(subjectRepository, 'findOneById').mockResolvedValue(subject);

    subject.name = 'test';
    const expected = subject;

    jest.spyOn(subjectRepository, 'save').mockResolvedValue(expected);

    const result = await subjectService.update(subject.id, subject.name);

    expect(result).toBe(expected);
  });

  it('Should delete subject', async () => {
    jest.spyOn(subjectRepository, 'delete').mockResolvedValue();

    await subjectService.delete('id test');
    expect(subjectRepository.delete).toHaveBeenCalledTimes(1);
  });
});
