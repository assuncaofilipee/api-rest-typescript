import { inject, injectable } from "tsyringe";
import Logger from "../../infrastructure/data/log/logger";
import SubjectRepositoryInterface from "../../domain/interfaces/repositories/subjectRepositoryInterface";
import SubjectInterface from "../../domain/interfaces/entities/subject";
import BuildPagination from "../../api/helpers/pagination";
import { SubjectServiceOutput } from "../../domain/interfaces/services/subject/subjectServiceOutput";

@injectable()
export default class SubjectService {
  constructor(
    @inject('SubjectRepositoryInterface')
    private readonly postgresSubjectRepository: SubjectRepositoryInterface
  ) {}

  get = async (limit: number, offset: number): Promise<SubjectServiceOutput> => {
    Logger.debug("subjectService - get - postgresSubjectRepository");
    const [subjects, totalRecords] = await this.postgresSubjectRepository.get(limit, offset);

    Logger.debug('subjectService - get - call BuildPagination');
    const pagination = BuildPagination(limit, offset, totalRecords);

    return { subjects, pagination };
  };

  save = async (subject: SubjectInterface): Promise<SubjectInterface> => {
    Logger.debug('subjectService - save - postgresSubjectRepository');
    return this.postgresSubjectRepository.save(subject);
  };
}
