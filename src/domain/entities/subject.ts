import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Course } from "./course";
import SubjectInterface from "../interfaces/entities/subject";

@Entity("subjects")
export class Subject implements SubjectInterface{
  constructor(subject: SubjectInterface) {
    if (subject) {
      this.name = subject.name?.trim();
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  name: string;

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
  deletedAt?: Date ;

  @ManyToMany(() => Course, (course) => course.subjects)
  @JoinTable({
    name: "course_subject",
    joinColumn: {
      name: "course_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "subject_id",
      referencedColumnName: "id",
    },
  })
  courses: Course[];
}
