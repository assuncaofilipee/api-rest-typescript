import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import Logger from '../../infrastructure/data/log/logger';
import { validationResult } from 'express-validator';
import SubjectService from '../../application/services/subjectService';
import { Subject } from '../../domain/entities/subject';
import { created, ok, serverError, unprocessableEntity } from '../helpers/httpHelper';

@injectable()
export default class SubjectController {
  constructor(
    @inject(SubjectService)
    public readonly subjectService: SubjectService
  ) {}

  get = async (request: Request, response: Response): Promise<Response> => {
    try {
      Logger.debug(
        `subjectController - get - query params: ${JSON.stringify(
          request.query
        )}`
      );
      const limit = Number(request.query.limit) || 20;
      const offset = Number(request.query.offset) || 0;
      const result = await this.subjectService.get(limit, offset);

      return ok(response, {
        data: result.subjects,
        pagination: result.pagination
      });
    } catch (error) {
      Logger.error(`subjectController - get - error: ${error}`);
      return serverError(response);
    }
  };

  save = async (request: Request, response: Response): Promise<Response> => {
    try {
      Logger.debug('subjectController - save - validate payload');
      const schemaErrors = validationResult(request);
      if (!schemaErrors.isEmpty()) {
        return unprocessableEntity(response, schemaErrors);
      }
      Logger.debug('subjectController - save - SubjectService');
      const subject = new Subject(request.body);
      const result = await this.subjectService.save(subject);
      return created(response, { data: result });
    } catch (error) {
      Logger.error(`subjectController - save - error: ${error}`);
      return serverError(response);
    }
  };
}
