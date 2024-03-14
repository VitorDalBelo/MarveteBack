"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccesstokens1709650889521 = void 0;
class CreateAccesstokens1709650889521 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "accesstokens" (
                "token" text NOT NULL,
                "user_id" integer NOT NULL,
                CONSTRAINT "UQ_31de9446ec61430df6c402ee080" UNIQUE ("token"),
                CONSTRAINT "PK_2cb2527d9022f20441b967feaf5" PRIMARY KEY ("user_id")
              )`);
    }
    async down(queryRunner) {
        await queryRunner.dropTable("accesstokens");
    }
}
exports.CreateAccesstokens1709650889521 = CreateAccesstokens1709650889521;
//# sourceMappingURL=1709650889521-create-accesstokens.js.map