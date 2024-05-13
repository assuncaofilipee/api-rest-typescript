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
import { EntityNotFoundError } from "typeorm";
import CacheMemoryInterface from "../../domain/interfaces/cache/cacheMemoryInterface";
import UserService from "../../application/services/userService";

@injectable()
export default class UserController {
  constructor(
    @inject(UserService)
    public readonly userService: UserService,
    @inject("CacheMemoryInterface")
    private readonly cacheMemory: CacheMemoryInterface
  ) {}

  save = async (request: Request, response: Response): Promise<Response> => {
    try {
      Logger.debug(
        `userController - save - body params: ${JSON.stringify(request.body)}`
      );
      const schemaErrors = validationResult(request);
      if (!schemaErrors.isEmpty()) {
        return unprocessableEntity(response, schemaErrors);
      }

      Logger.debug("userController - save - userService");
      const result = await this.userService.save(request);

      await this.cacheMemory.deleteAllPrefix('users:all*');

      return created(response, { data: result });
    } catch (error) {
      Logger.error(`userController - save - error: ${error}`);
      return serverError(response);
    }
  };

  find = async (request: Request, response: Response): Promise<Response> => {
    try {
      const limit = Number(request.query.limit) || 20;
      const offset = Number(request.query.offset) || 0;
      const cacheKey = `users:all:${limit}:${offset}`;
      const cached = await this.cacheMemory.getter(cacheKey);

      if (cached) {
        const result = JSON.parse(cached);
        return ok(response, {
          data: result.users,
          pagination: result.pagination,
        });
      }

      Logger.debug(
        `userController - find - query params: ${JSON.stringify(
          request.query
        )}`
      );
      const result = await this.userService.find(limit, offset);

      await this.cacheMemory.setter(
        cacheKey,
        JSON.stringify(result),
        parseInt(process.env.DATA_CACHE_EXPIRATION_IN_SECONDS!, 10)
      );

      return ok(response, {
        data: result.users,
        pagination: result.pagination,
      });
    } catch (error) {
      Logger.error(`userController - find - error: ${error}`);
      return serverError(response);
    }
  };

  update = async (request: Request, response: Response): Promise<Response> => {
    try {
      Logger.debug(
        `userController - update - body params: ${JSON.stringify(
          request.body
        )}`
      );
      const schemaErrors = validationResult(request);
      if (!schemaErrors.isEmpty()) {
        return unprocessableEntity(response, schemaErrors);
      }

      Logger.debug("userController - userService - update");
      const result = await this.userService.update(request);

      await this.cacheMemory.deleteAllPrefix('users:all*');

      return ok(response, result);
    } catch (error) {
      Logger.error(`userController - save - error: ${error}`);
      if (error instanceof EntityNotFoundError) {
        return notFound(response, "Course not found");
      }
      return serverError(response);
    }
  };

  delete = async (request: Request, response: Response): Promise<Response> => {
    try {
      Logger.debug(
        `userController - delete - id: ${JSON.stringify(request.params.id)}`
      );
      const schemaErrors = validationResult(request);
      if (!schemaErrors.isEmpty()) {
        return unprocessableEntity(response, schemaErrors);
      }

      Logger.debug("userController - userService - delete");
      await this.userService.delete(request.params.id);

      await this.cacheMemory.deleteAllPrefix('users:all*');

      return noContent(response);
    } catch (error) {
      Logger.error(`userController - delete - error: ${error}`);
      return serverError(response);
    }
  };
}
