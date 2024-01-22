import { PaginationInterface } from '../../pagination/paginationInterface';
import VideoInterface from '../../entities/video';

export interface VideoServiceOutput {
  videos: VideoInterface[];
  pagination: PaginationInterface;
}
