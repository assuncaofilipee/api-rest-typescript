import { inject, injectable } from "tsyringe";
import { EntityManager, Repository } from "typeorm";
import UserRepositoryInterface from "../../../domain/interfaces/repositories/userRepositoryInterface";
import UserInterface from "../../../domain/interfaces/entities/user";
import { User } from "../../../domain/entities/user";

@injectable()
export default class UserRepository
  implements UserRepositoryInterface
{
  private userRepository: Repository<UserInterface>;

  constructor(
    @inject("EntityManager")
    private readonly entityManager: EntityManager
  ) {
    this.userRepository = this.entityManager.getRepository(User);
  }

  find = async (
    limit: number,
    offset: number
  ): Promise<[UserInterface[], number]> => {
    return this.userRepository.findAndCount({
      skip: offset,
      take: limit,
    });
  };

  save = async (user: User): Promise<UserInterface> => {
    return this.userRepository.save(user);
  };

  findOneById = async (id: string): Promise<UserInterface | null> => {
    return this.userRepository.findOneOrFail({
      where: {
        id: id,
      },
    });
  };

  findOneByEmail = async (email: string): Promise<UserInterface | null> => {
    return this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  };

  delete = async (id: string): Promise<void> => {
    await this.userRepository.softDelete(id);
  }
}
