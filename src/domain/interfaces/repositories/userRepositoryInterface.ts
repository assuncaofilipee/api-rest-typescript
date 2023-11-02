import UserInterface from "../entities/user";

export default interface UserRepositoryInterface {
  find(limit: number, offset: number): Promise<[UserInterface[], number]>
  save(user: UserInterface): Promise<UserInterface>;
  findOneById(id: string): Promise<UserInterface | null>;
  findOneByEmail(email: string): Promise<UserInterface | null>;
  delete(id: string): Promise<void>;
}