import { inject, injectable } from "tsyringe";
import { EntityManager, In, Repository } from "typeorm";
import VideoInterface from "../../../domain/interfaces/entities/video";
import VideoRepositoryInterface from "../../../domain/interfaces/repositories/videoRepositoryInterface";
import { Video } from "../../../domain/entities/video";

@injectable()
export default class PostgresVideoRepository
  implements VideoRepositoryInterface
{
  private videoRepository: Repository<VideoInterface>;

  constructor(
    @inject("EntityManager")
    private readonly entityManager: EntityManager
  ) {
    this.videoRepository = this.entityManager.getRepository(Video);
  }

  find = async (
    limit: number,
    offset: number
  ): Promise<[VideoInterface[], number]> => {
    return this.videoRepository.findAndCount({
      skip: offset,
      take: limit,
    });
  };

  save = async (video: Video): Promise<VideoInterface> => {
    return this.videoRepository.save(video);
  };

  findOneById = async (id: string): Promise<VideoInterface | null> => {
    return this.videoRepository.findOneOrFail({
      where: {
        id: id,
      },
    });
  };

  delete = async (id: string): Promise<void> => {
    const video = await this.findOneById(id);
    await this.videoRepository.softRemove(video!);
  }

  findByIds = async (ids: Array<string>): Promise<VideoInterface[] | null> => {
    return this.videoRepository.findBy({
      id: In(ids)
    });
  };
}
