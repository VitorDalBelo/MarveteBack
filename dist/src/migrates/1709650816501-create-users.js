"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsers1709650816501 = void 0;
class CreateUsers1709650816501 {
    async up(queryRunner) {
        await queryRunner.query(`
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
            `);
    }
    async down(queryRunner) {
        await queryRunner.dropTable("users");
    }
}
exports.CreateUsers1709650816501 = CreateUsers1709650816501;
//# sourceMappingURL=1709650816501-create-users.js.map