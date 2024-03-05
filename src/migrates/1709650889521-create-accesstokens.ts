import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAccesstokens1709650889521 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "accesstokens" (
                "token" text NOT NULL,
                "user_id" integer NOT NULL,
                CONSTRAINT "UQ_31de9446ec61430df6c402ee080" UNIQUE ("token"),
                CONSTRAINT "PK_2cb2527d9022f20441b967feaf5" PRIMARY KEY ("user_id")
              )`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("accesstokens")
    }

}
