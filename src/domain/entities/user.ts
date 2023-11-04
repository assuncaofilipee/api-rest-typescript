import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import UserInterface from "../interfaces/entities/user";
import bcrypt from 'bcryptjs';

@Entity("users")
export class User implements UserInterface {
  constructor(user: UserInterface) {
    if (user) {
      this.id = user.id ?? uuidv4();
      this.name = user.name?.trim();
      this.email = user.email?.trim();
      this.password = user.password;
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "varchar", length: 100 })
  email: string;

  @Column({ type: "varchar", length: 100 })
  password: string;

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
    name: "deleted_at",
    type: "timestamptz",
  })
  deletedAt?: Date;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassowrd() {
    this.password = bcrypt.hashSync(this.password, 8);
  }
}
