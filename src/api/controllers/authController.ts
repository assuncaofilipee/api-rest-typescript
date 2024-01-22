import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import Logger from "../../infrastructure/data/log/logger";
import { validationResult } from "express-validator";
import {
  notFound,
  ok,
  serverError,
  unauthorized,
  unprocessableEntity,
} from "../helpers/httpHelper";
import { EntityNotFoundError } from "typeorm";
import CacheMemoryInterface from "../../domain/interfaces/cache/cacheMemoryInterface";
import UserService from "../../application/services/userService";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

@injectable()
export default class AuthController {
  constructor(
    @inject(UserService)
    public readonly userService: UserService,
    @inject("CacheMemoryInterface")
    private readonly cacheMemory: CacheMemoryInterface
  ) {}

  authenticate = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    try {
      Logger.debug(
        `authController - authenticate - body params: ${JSON.stringify(
          request.body
        )}`
      );
      const schemaErrors = validationResult(request);
      if (!schemaErrors.isEmpty()) {
        return unprocessableEntity(response, schemaErrors);
      }

      Logger.debug("authController - userService - findOneByEmail");
      const user = await this.userService.findOneByEmail(request.body.email);

      if (!user) {
        return unauthorized(response);
      }

      const isValidPassword = await bcrypt.compare(
        request.body.password,
        user.password
      );

      if (!isValidPassword) {
        return unauthorized(response);
      }

      const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1d" });

      return ok(response, { data: { user: user, token: token } });
    } catch (error) {
      Logger.error(`courseController - save - error: ${error}`);
      if (error instanceof EntityNotFoundError) {
        return notFound(response, error.message);
      }
      return serverError(response);
    }
  };
}
