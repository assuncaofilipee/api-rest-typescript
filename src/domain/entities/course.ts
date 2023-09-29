import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Video } from "./video";
import { Subject } from "./subject";

@Entity("courses")
export class Course {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;
  
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

  @OneToMany(() => Video, (video) => video.course)
  videos: Video[];

  @ManyToMany(() => Subject, (subject) => subject.courses)
  subjects: Subject[];
}
