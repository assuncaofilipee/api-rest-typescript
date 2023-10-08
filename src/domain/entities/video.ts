import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import VideoInterface from "../interfaces/entities/video";
import { Course } from "./course";
import { v4 as uuidv4 } from 'uuid';

@Entity("videos")
export class Video implements VideoInterface {
  constructor(video: VideoInterface) {
    if (video) {
      this.id = video.id ?? uuidv4();
      this.title = video.title?.trim();
      this.url = video.url?.trim();
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 150 })
  title: string;

  @Column({ type: "varchar", length: 150 })
  url: string;

  @Column({
    name: 'created_at',
    type: 'timestamptz'
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamptz'
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz'
  })
  deletedAt?: Date;

  @ManyToOne(() => Course, (course) => course.videos)
  @JoinColumn({ name: "course_id" })
  course: Course;
}
