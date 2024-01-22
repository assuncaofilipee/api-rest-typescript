import { Subject } from "../../entities/subject";
import { Video } from "../../entities/video";

export default interface CourseInterface {
  id: string;
  name: string;
  description: string;
  subject?: Subject;
  videos?: Video[];
  createdAt: Date;
  updatedAt: Date;
}
