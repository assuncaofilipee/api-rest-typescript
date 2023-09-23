import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1695484721904 implements MigrationInterface {
    name = 'Migration1695484721904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "videos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "url" text NOT NULL, "room_id" uuid, CONSTRAINT "PK_e4c86c0cf95aff16e9fb8220f6b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subjects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, CONSTRAINT "PK_1a023685ac2b051b4e557b0b280" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "courses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "description" text, CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course_subject" ("course_id" uuid NOT NULL, "subject_id" uuid NOT NULL, CONSTRAINT "PK_246f5ea654b5aea3a3e747d087d" PRIMARY KEY ("course_id", "subject_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_00a5bee2c4b7053ae77478fe32" ON "course_subject" ("course_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_49b3882567e1f74ddc36ff2d05" ON "course_subject" ("subject_id") `);
        await queryRunner.query(`ALTER TABLE "videos" ADD CONSTRAINT "FK_64bb2d8544299bbde670698ac37" FOREIGN KEY ("room_id") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_subject" ADD CONSTRAINT "FK_00a5bee2c4b7053ae77478fe32c" FOREIGN KEY ("course_id") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "course_subject" ADD CONSTRAINT "FK_49b3882567e1f74ddc36ff2d05e" FOREIGN KEY ("subject_id") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_subject" DROP CONSTRAINT "FK_49b3882567e1f74ddc36ff2d05e"`);
        await queryRunner.query(`ALTER TABLE "course_subject" DROP CONSTRAINT "FK_00a5bee2c4b7053ae77478fe32c"`);
        await queryRunner.query(`ALTER TABLE "videos" DROP CONSTRAINT "FK_64bb2d8544299bbde670698ac37"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_49b3882567e1f74ddc36ff2d05"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_00a5bee2c4b7053ae77478fe32"`);
        await queryRunner.query(`DROP TABLE "course_subject"`);
        await queryRunner.query(`DROP TABLE "courses"`);
        await queryRunner.query(`DROP TABLE "subjects"`);
        await queryRunner.query(`DROP TABLE "videos"`);
    }

}
