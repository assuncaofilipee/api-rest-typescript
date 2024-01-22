import { PaginationInterface } from '../../pagination/paginationInterface';
import SubjectInterface from '../../entities/subject';

export interface SubjectServiceOutput {
  subjects: SubjectInterface[];
  pagination: PaginationInterface;
}
