import CourseInterface from "../entities/course";

export default interface CourseRepositoryInterface {
  find(limit: number, offset: number): Promise<[CourseInterface[], number]>
  save(course: CourseInterface): Promise<CourseInterface>;
  findOneById(id: string): Promise<CourseInterface | null>;
  delete(id: string): Promise<void>;
}