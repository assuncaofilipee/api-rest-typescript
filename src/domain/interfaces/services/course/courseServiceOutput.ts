import { PaginationInterface } from '../../pagination/paginationInterface';
import CourseInterface from '../../entities/course';

export interface CourseServiceOutput {
  courses: CourseInterface[];
  pagination: PaginationInterface;
}
