import { MigrationInterface, QueryRunner } from "typeorm";

export class Paymentid1697490695518 implements MigrationInterface {
    name = 'Paymentid1697490695518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "paymentId"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "paymentId" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "paymentId"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "paymentId" character varying NOT NULL`);
    }

}
