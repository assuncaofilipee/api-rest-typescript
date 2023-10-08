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
import VideoService from "../../application/services/videoService";
import { Video } from "../../domain/entities/video";
import { EntityNotFoundError } from "typeorm";

@injectable()
export default class VideoController {
  constructor(
    @inject(VideoService)
    public readonly videoService: VideoService
  ) {}

  save = async (request: Request, response: Response): Promise<Response> => {
    try {
      Logger.debug(
        `videoController - save - body params: ${JSON.stringify(request.body)}`
      );
      const schemaErrors = validationResult(request);
      if (!schemaErrors.isEmpty()) {
        return unprocessableEntity(response, schemaErrors);
      }
      Logger.debug("videoController - videoService - save");
      const result = await this.videoService.save(request);

      return created(response, { data: result });
    } catch (error) {
      Logger.error(`videoController - save - error: ${error}`);
      return serverError(response);
    }
  };

  find = async (request: Request, response: Response): Promise<Response> => {
    try {
      Logger.debug(
        `videoController - find - query params: ${JSON.stringify(
          request.query
        )}`
      );
      const limit = Number(request.query.limit) || 20;
      const offset = Number(request.query.offset) || 0;

      Logger.debug("videoController - videoService - find");
      const result = await this.videoService.find(limit, offset);

      return ok(response, {
        data: result.videos,
        pagination: result.pagination,
      });
    } catch (error) {
      Logger.error(`videoController - find - error: ${error}`);
      return serverError(response);
    }
  };

  update = async (request: Request, response: Response): Promise<Response> => {
    try {
      Logger.debug(
        `videoController - update - body params: ${JSON.stringify(
          request.body
        )}`
      );
      const schemaErrors = validationResult(request);
      if (!schemaErrors.isEmpty()) {
        return unprocessableEntity(response, schemaErrors);
      }

      Logger.debug("videoController - VideoService - update");
      const result = await this.videoService.update(request);

      return ok(response, result);
    } catch (error) {
      Logger.error(`videoController - save - error: ${error}`);
      if (error instanceof EntityNotFoundError) {
        return notFound(response, "Video not found");
      }
      return serverError(response);
    }
  };

  delete = async (request: Request, response: Response): Promise<Response> => {
    try {
      Logger.debug(
        `videoController - delete - id: ${JSON.stringify(
          request.params.id
        )}`
      );
      const schemaErrors = validationResult(request);
      if (!schemaErrors.isEmpty()) {
        return unprocessableEntity(response, schemaErrors);
      }

      Logger.debug("videoController- videoService - delete");
      await this.videoService.delete(request.params.id);

      return noContent(response);
    } catch (error) {
      Logger.error(`videoController - delete - error: ${error}`);
      if (error instanceof EntityNotFoundError) {
        return notFound(response, "Video not found");
      }
      return serverError(response);
    }
  };
}
