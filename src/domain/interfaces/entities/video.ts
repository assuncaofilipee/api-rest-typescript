import { Course } from "../../entities/course";

export default interface VideoInterface {
  id: string;
  title: string;
  url: string;
  course: Course;
  createdAt: Date;
  updatedAt: Date;
}
