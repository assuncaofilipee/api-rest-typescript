import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Course } from "./course";

@Entity("subjects")
export class Subject {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  name: string;

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
