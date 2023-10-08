import { inject, injectable } from "tsyringe";
import { EntityManager, Repository } from "typeorm";
import CourseRepositoryInterface from "../../../domain/interfaces/repositories/courseRepositoryInterface";
import CourseInterface from "../../../domain/interfaces/entities/course";
import { Course } from "../../../domain/entities/course";

@injectable()
export default class PostgresCourseRepository
  implements CourseRepositoryInterface
{
  private courseRepository: Repository<CourseInterface>;

  constructor(
    @inject("EntityManager")
    private readonly entityManager: EntityManager
  ) {
    this.courseRepository = this.entityManager.getRepository(Course);
  }

  find = async (
    limit: number,
    offset: number
  ): Promise<[CourseInterface[], number]> => {
    return this.courseRepository.findAndCount({
      skip: offset,
      take: limit,
    });
  };

  save = async (course: Course): Promise<CourseInterface> => {
    return this.courseRepository.save(course);
  };

  findOneById = async (id: string): Promise<CourseInterface | null> => {
    return this.courseRepository.findOneOrFail({
      where: {
        id: id,
      },
    });
  };

  delete = async (id: string): Promise<void> => {
    await this.courseRepository.softDelete(id);
  }
}
