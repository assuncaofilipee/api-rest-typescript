import { PaginationInterface } from '../../pagination/paginationInterface';
import UserInterface from '../../entities/user';

export interface UserServiceOutput {
  users: UserInterface[];
  pagination: PaginationInterface;
}
