import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import Logger from '../../infrastructure/data/log/logger';
import { validationResult } from 'express-validator';
import SubjectService from '../../application/services/subjectService';
import { Subject } from '../../domain/entities/subject';

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

      return response.status(200).json({
        data: result.subjects,
        pagination: result.pagination
      });
    } catch (error) {
      Logger.error(`subjectController - get - error: ${error}`);
      if (error instanceof Error) {
        return response.status(400).json({ error: error.message });
      }
      return response.status(500).send('Internal Server Error');
    }
  };

  save = async (request: Request, response: Response): Promise<Response> => {
    try {
      Logger.debug('subjectController - save - validate payload');
      const schemaErrors = validationResult(request);
      if (!schemaErrors.isEmpty()) {
        return response.status(422).send(schemaErrors.array());
      }
      Logger.debug('subjectController - save - SubjectService');
      const subject = new Subject(request.body);
      const result = await this.subjectService.save(subject);
      return response.status(201).json({ data: result });
    } catch (error) {
      Logger.error(`subjectController - save - error: ${error}`);
      if (error instanceof Error) {
        return response.status(400).json({ error: error.message });
      }
      return response.status(500).send('Internal Server Error');
    }
  };
}
