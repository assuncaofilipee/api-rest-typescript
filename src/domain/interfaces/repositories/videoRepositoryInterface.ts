import VideoInterface from "../entities/video";

export default interface VideoRepositoryInterface {
  find(limit: number, offset: number): Promise<[VideoInterface[], number]>
  save(video: VideoInterface): Promise<VideoInterface>;
  findOneById(id: string): Promise<VideoInterface | null>;
  delete(id: string): Promise<void>;
  findByIds(ids: Array<string>): Promise<VideoInterface[] | null>;
}