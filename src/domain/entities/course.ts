import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Video } from "./video";
import courseInterface from "../interfaces/entities/course";
import { v4 as uuidv4 } from "uuid";
import { Subject } from "./subject";

@Entity("courses")
export class Course implements courseInterface {
  constructor(course: courseInterface) {
    if (course) {
      this.id = course.id ?? uuidv4();
      this.name = course.name?.trim();
      this.description = course.description?.trim();
      this.subject = course.subject;
      this.videos = course.videos;
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 150 })
  name: string;

  @Column({ type: "varchar", length: 250, nullable: true })
  description: string;

  @ManyToOne(() => Subject, (subject) => subject.courses, { eager: true })
  @JoinColumn({ name: "subject_id" })
  subject?: Subject;

  @Column({
    name: "created_at",
    type: "timestamptz",
  })
  createdAt: Date;

  @Column({
    name: "updated_at",
    type: "timestamptz",
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz'
  })
  deletedAt?: Date;

  @OneToMany(() => Video, (video) => video.course, { eager: true })
  videos?: Video[];
}
