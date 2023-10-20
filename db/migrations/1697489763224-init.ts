import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1697489763224 implements MigrationInterface {
    name = 'Init1697489763224'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."orders_status_enum" NOT NULL DEFAULT 'NOUVEAU', "totalPrice" numeric(10,2) NOT NULL DEFAULT '0', "name" character varying NOT NULL, "paymentId" character varying NOT NULL, "adresse" character varying NOT NULL, "addressLatLngId" integer, "userId" integer, "orderItemsId" integer, CONSTRAINT "REL_a200c58a5353f2ec7e6cd12941" UNIQUE ("addressLatLngId"), CONSTRAINT "REL_9299258e9070dc61eb0ab9c8ad" UNIQUE ("orderItemsId"), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_a200c58a5353f2ec7e6cd12941f" FOREIGN KEY ("addressLatLngId") REFERENCES "LatLng"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_9299258e9070dc61eb0ab9c8ad4" FOREIGN KEY ("orderItemsId") REFERENCES "order_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_9299258e9070dc61eb0ab9c8ad4"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_a200c58a5353f2ec7e6cd12941f"`);
        await queryRunner.query(`DROP TABLE "orders"`);
    }

}
