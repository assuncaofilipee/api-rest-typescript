import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import Logger from "../../infrastructure/data/log/logger";
import { validationResult } from "express-validator";
import {
  created,
  noContent,
  notFound,
  ok,
  serverError,
  unprocessableEntity,
} from "../helpers/httpHelper";
import CourseService from "../../application/services/courseService";
import { EntityNotFoundError } from "typeorm";
import SubjectService from "../../application/services/subjectService";

@injectable()
export default class CourseController {
  constructor(
    @inject(CourseService)
    public readonly courseService: CourseService,
    @inject(SubjectService)
    public readonly subjectService: SubjectService
  ) {}

  save = async (request: Request, response: Response): Promise<Response> => {
    try {
      Logger.debug(
        `courseController - save - body params: ${JSON.stringify(request.body)}`
      );
      const schemaErrors = validationResult(request);
      if (!schemaErrors.isEmpty()) {
        return unprocessableEntity(response, schemaErrors);
      }

      Logger.debug("courseController - save - courseService");
      const result = await this.courseService.save(request);
      
      return created(response, { data: result });
    } catch (error) {
      Logger.error(`courseController - save - error: ${error}`);
      if (error instanceof EntityNotFoundError) {
        return notFound(response, error.message);
      }
      return serverError(response);
    }
  };

  find = async (request: Request, response: Response): Promise<Response> => {
    try {
      Logger.debug(
        `courseController - find - query params: ${JSON.stringify(
          request.query
        )}`
      );
      const limit = Number(request.query.limit) || 20;
      const offset = Number(request.query.offset) || 0;
      const result = await this.courseService.find(limit, offset);

      return ok(response, {
        data: result.courses,
        pagination: result.pagination,
      });
    } catch (error) {
      Logger.error(`courseController - find - error: ${error}`);
      return serverError(response);
    }
  };

  update = async (request: Request, response: Response): Promise<Response> => {
    try {
      Logger.debug(
        `courseController - update - body params: ${JSON.stringify(
          request.body
        )}`
      );
      const schemaErrors = validationResult(request);
      if (!schemaErrors.isEmpty()) {
        return unprocessableEntity(response, schemaErrors);
      }
    
      Logger.debug("courseController - CourseService - update");
      const result = await this.courseService.update(request);
      
      return ok(response, result);
    } catch (error) {
      Logger.error(`courseController - save - error: ${error}`);
      if (error instanceof EntityNotFoundError) {
        return notFound(response, "Course not found");
      }
      return serverError(response);
    }
  };

  delete = async (request: Request, response: Response): Promise<Response> => {
    try {
      Logger.debug(
        `courseController - delete - id: ${JSON.stringify(
          request.params.id
        )}`
      );
      const schemaErrors = validationResult(request);
      if (!schemaErrors.isEmpty()) {
        return unprocessableEntity(response, schemaErrors);
      }

      Logger.debug("courseController - courseService - delete");
      await this.courseService.delete(request.params.id);

      return noContent(response);
    } catch (error) {
      Logger.error(`courseController - delete - error: ${error}`);
      if (error instanceof EntityNotFoundError) {
        return notFound(response, "Course not found");
      }
      return serverError(response);
    }
  };
}
