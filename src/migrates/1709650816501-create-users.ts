import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsers1709650816501 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
            CREATE TABLE "users" (
                "user_id" SERIAL NOT NULL,
                "name" character varying(255) NOT NULL,
                "email" character varying(255) NOT NULL,
                "photo" character varying(255),
                "hashpassword" character varying(255),
                "googleRefreshToken" character varying,
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id")
              )
            `
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users")
    }

}
