import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Course } from "./course";

@Entity("videos")
export class Video {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  title: string;

  @Column({ type: "text" })
  url: string;

  @ManyToOne(() => Course, (course) => course.videos)
  @JoinColumn({ name: "room_id" })
  course: Course;
}
