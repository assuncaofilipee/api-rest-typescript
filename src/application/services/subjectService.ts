import { inject, injectable } from "tsyringe";
import Logger from "../../infrastructure/data/log/logger";
import SubjectRepositoryInterface from "../../domain/interfaces/repositories/subjectRepositoryInterface";
import SubjectInterface from "../../domain/interfaces/entities/subject";
import BuildPagination from "../../api/helpers/pagination";
import { SubjectServiceOutput } from "../../domain/interfaces/services/subject/subjectServiceOutput";
import { Request } from "express";

@injectable()
export default class SubjectService {
  constructor(
    @inject('SubjectRepositoryInterface')
    private readonly postgresSubjectRepository: SubjectRepositoryInterface
  ) {}

  find = async (limit: number, offset: number): Promise<SubjectServiceOutput> => {
    Logger.debug("subjectService - postgresSubjectRepository- find");
    const [subjects, totalRecords] = await this.postgresSubjectRepository.find(limit, offset);

    Logger.debug('subjectService - find - call BuildPagination');
    const pagination = BuildPagination(limit, offset, totalRecords);

    return { subjects, pagination };
  };

  save = async (subject: SubjectInterface): Promise<SubjectInterface> => {
    Logger.debug('subjectService - postgresSubjectRepository- save');
    return this.postgresSubjectRepository.save(subject);
  };

  update = async (request: Request): Promise<SubjectInterface> => {
    Logger.debug('subjectService - postgresSubjectRepository - findOneById');
    const subject = await this.findOneById(
      request.params.id
    );

    Object.assign(subject!, {
      name: request.body?.name ?? subject?.name
    });

    Logger.debug('subjectService - postgresSubjectRepository - save');
    return this.postgresSubjectRepository.save(subject!);
  };

  findOneById = async (id: string): Promise<SubjectInterface | null> => {
    Logger.debug("subjectService - postgresSubjectRepository - findOneById");
    return this.postgresSubjectRepository.findOneById(id);
  };

  delete = async (id: string): Promise<void> => { 
    Logger.debug("subjectService - postgresSubjectRepository- delete");
    await this.postgresSubjectRepository.delete(id);
   };
}
