import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Course } from "./course";
import SubjectInterface from "../interfaces/entities/subject";
import { v4 as uuidv4 } from 'uuid';

@Entity("subjects")
export class Subject implements SubjectInterface{
  constructor(subject: SubjectInterface) {
    if (subject) {
      this.id = subject.id ?? uuidv4();
      this.name = subject.name?.trim();
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 150 })
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

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz'
  })
  deletedAt?: Date;

  @OneToMany(() => Course, (course) => course.subject)
  courses?: Course[];
}
