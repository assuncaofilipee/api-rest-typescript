import { inject, injectable } from "tsyringe";
import Logger from "../../infrastructure/data/log/logger";
import BuildPagination from "../../api/helpers/pagination";
import CourseRepositoryInterface from "../../domain/interfaces/repositories/courseRepositoryInterface";
import { CourseServiceOutput } from "../../domain/interfaces/services/course/courseServiceOutput";
import CourseInterface from "../../domain/interfaces/entities/course";
import SubjectService from "./subjectService";
import { Request } from "express";
import { Course } from "../../domain/entities/course";

@injectable()
export default class CourseService {
  constructor(
    @inject("CourseRepositoryInterface")
    private readonly postgresCourseRepository: CourseRepositoryInterface,
    @inject(SubjectService)
    public readonly subjectService: SubjectService
  ) {}

  find = async (
    limit: number,
    offset: number
  ): Promise<CourseServiceOutput> => {
    Logger.debug("courseService - postgresCourseRepository- get");
    const [courses, totalRecords] = await this.postgresCourseRepository.find(
      limit,
      offset
    );

    Logger.debug("courseService - find - call BuildPagination");
    const pagination = BuildPagination(limit, offset, totalRecords);

    return { courses, pagination };
  };

  save = async (request: Request): Promise<CourseInterface> => {
    Logger.debug("courseService - subjectService - findOneById");
    const subject = await this.subjectService.findOneById(
      request.body.subjectId
    );

    const course = new Course(request.body);
    course.subject = subject!;

    Logger.debug("courseService - postgresCourseRepository - save");
    return this.postgresCourseRepository.save(course);
  };

  update = async (request: Request): Promise<CourseInterface> => {
    Logger.debug("courseService - postgresCourseRepository - findOneById");
    let course = await this.postgresCourseRepository.findOneById(request.params.id);
    
    Object.assign(course!, {
      name: request.body?.name ?? course?.name,
      description: request.body?.description ?? course?.description
    });

    Logger.debug("courseService - postgresCourseRepository - save");
    return this.postgresCourseRepository.save(course!);
  };

  findOneById = async (id: string): Promise<CourseInterface | null> => {
    Logger.debug("courseService - postgresCourseRepository - findOneById");
    return this.postgresCourseRepository.findOneById(id);
  };

  delete = async (id: string): Promise<void> => {
    Logger.debug("courseService - postgresCourseRepository - delete");
    await this.postgresCourseRepository.delete(id);
  };
}
