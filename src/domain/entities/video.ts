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

  @Column({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true
  })
  deletedAt?: Date;

  @ManyToOne(() => Course, (course) => course.videos)
  @JoinColumn({ name: "room_id" })
  course: Course;
}
