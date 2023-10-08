import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1696796709701 implements MigrationInterface {
    name = 'Migration1696796709701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "videos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(150) NOT NULL, "url" character varying(150) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, "course_id" uuid, CONSTRAINT "PK_e4c86c0cf95aff16e9fb8220f6b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subjects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_1a023685ac2b051b4e557b0b280" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "courses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "description" character varying(250), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, "subject_id" uuid, CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "videos" ADD CONSTRAINT "FK_8f6e233979bc8acf49166c986fe" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_05f921ecf5310e1204a95d824a9" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_05f921ecf5310e1204a95d824a9"`);
        await queryRunner.query(`ALTER TABLE "videos" DROP CONSTRAINT "FK_8f6e233979bc8acf49166c986fe"`);
        await queryRunner.query(`DROP TABLE "courses"`);
        await queryRunner.query(`DROP TABLE "subjects"`);
        await queryRunner.query(`DROP TABLE "videos"`);
    }

}
