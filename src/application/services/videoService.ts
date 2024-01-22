import { inject, injectable } from "tsyringe";
import Logger from "../../infrastructure/data/log/logger";
import BuildPagination from "../../api/helpers/pagination";
import VideoRepositoryInterface from "../../domain/interfaces/repositories/videoRepositoryInterface";
import { VideoServiceOutput } from "../../domain/interfaces/services/video/videoServiceOutput";
import VideoInterface from "../../domain/interfaces/entities/video";
import { Request } from "express";
import CourseService from "./courseService";
import { Video } from "../../domain/entities/video";

@injectable()
export default class VideoService {
  constructor(
    @inject("VideoRepositoryInterface")
    private readonly postgresVideoRepository: VideoRepositoryInterface,
    @inject(CourseService)
    private readonly courseService: CourseService
  ) {}

  find = async (limit: number, offset: number): Promise<VideoServiceOutput> => {
    Logger.debug("videoService - postgresVideoRepository - find");
    const [videos, totalRecords] = await this.postgresVideoRepository.find(
      limit,
      offset
    );

    Logger.debug("videoService - find - call BuildPagination");
    const pagination = BuildPagination(limit, offset, totalRecords);

    return { videos, pagination };
  };

  save = async (request: Request): Promise<VideoInterface> => {
    Logger.debug("videoService - courseService - findOneById");
    const course = await this.courseService.findOneById(
      request.body.courseId
    );
    const video = new Video(request.body);
    video.course = course!;

    Logger.debug("videoService - postgresVideoRepository- save");
    return this.postgresVideoRepository.save(video);
  };

  update = async (request: Request): Promise<VideoInterface> => {
    Logger.debug("courseService - postgresVideoRepository - findOneById");
    let video = await this.postgresVideoRepository.findOneById(request.params.id);

    Object.assign(video!, {
      title: request.body?.title ?? video?.title,
      url: request.body?.url ?? video?.url
    });

    const courseId = request.body.courseId;
    if (courseId) {
      let course = await this.courseService.findOneById(courseId);
      Object.assign(video!, {
        course: course,
      });
    }

    Logger.debug("courseService - postgresVideoRepository -save");
    return this.postgresVideoRepository.save(video!);
  };


  findOneById = async (id: string): Promise<VideoInterface | null> => {
    Logger.debug("videoService - postgresVideoRepository- findOneById ");
    return this.postgresVideoRepository.findOneById(id);
  };

  delete = async (id: string): Promise<void> => {
    Logger.debug("videoService - postgresVideoRepository- delete");
    await this.postgresVideoRepository.delete(id);
  };

  findByIds = async (
    ids: Array<string>
  ): Promise<VideoInterface[] | null> => {
    Logger.debug("videoService - postgresVideoRepository- findOneById");
    return this.postgresVideoRepository.findByIds(ids);
  };
}
