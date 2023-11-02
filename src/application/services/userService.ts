import { inject, injectable } from "tsyringe";
import Logger from "../../infrastructure/data/log/logger";
import BuildPagination from "../../api/helpers/pagination";
import { Request } from "express";
import { UserServiceOutput } from "../../domain/interfaces/services/user/userServiceOutput";
import UserRepositoryInterface from "../../domain/interfaces/repositories/userRepositoryInterface";
import { User } from "../../domain/entities/user";
import UserInterface from "../../domain/interfaces/entities/user";
import { UnprocessableError } from "../../api/helpers/appError";
import bcrypt from 'bcryptjs';

@injectable()
export default class UserService {
  constructor(
    @inject("UserRepositoryInterface")
    private readonly postgresUserRepository: UserRepositoryInterface
  ) {}

  find = async (
    limit: number,
    offset: number
  ): Promise<UserServiceOutput> => {
    Logger.debug("userService - postgresUserRepository- get");
    const [users, totalRecords] = await this.postgresUserRepository.find(
      limit,
      offset
    );

    Logger.debug("userService - find - call BuildPagination");
    const pagination = BuildPagination(limit, offset, totalRecords);

    return { users, pagination };
  };

  save = async (request: Request): Promise<UserInterface> => {
    let user = new User(request.body);
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;

    if(await this.findOneByEmail(user.email)) {
       throw new UnprocessableError("User already exists");
    }

    Logger.debug("userService - postgresUserRepository - save");
    return this.postgresUserRepository.save(user);
  };

  update = async (request: Request): Promise<UserInterface> => {
    Logger.debug("userService - postgresUserRepository - findOneById");
    let user = await this.postgresUserRepository.findOneById(request.params.id);
    
    Object.assign(user!, {
      name: request.body?.name ?? user?.name,
      email: request.body?.email ?? user?.email,
      password: request.body?.password ?? user?.password
    });

    Logger.debug("userService - postgresUserRepository - save");
    return this.postgresUserRepository.save(user!);
  };

  findOneById = async (id: string): Promise<UserInterface | null> => {
    Logger.debug("userService - postgresUserRepository - findOneById");
    return this.postgresUserRepository.findOneById(id);
  };

  findOneByEmail = async (email: string): Promise<UserInterface | null> => {
    Logger.debug("userService - postgresUserRepository - findOneByEmail");
    return this.postgresUserRepository.findOneByEmail(email);
  };

  delete = async (id: string): Promise<void> => {
    Logger.debug("userService - postgresUserRepository - delete");
    await this.postgresUserRepository.delete(id);
  };
}
