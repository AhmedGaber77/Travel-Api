import { MigrationInterface, QueryRunner } from "typeorm";

export class AddWholesalerTable1704713438400 implements MigrationInterface {
    name = 'AddWholesalerTable1704713438400'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "wholesaler" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "contactInfo" json NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "address" character varying, "city" character varying, "state" character varying, "country" character varying, "postalCode" character varying(255), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_f9a076d19a6cb0ce6a135f8092d" UNIQUE ("email"), CONSTRAINT "UQ_6f662652b2e359cdb0dbf4214c0" UNIQUE ("phone"), CONSTRAINT "PK_1a69d581c4950536214fab59079" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "wholesalerId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_2890454b64cdb3bf33c969ae235" FOREIGN KEY ("wholesalerId") REFERENCES "wholesaler"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_2890454b64cdb3bf33c969ae235"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "wholesalerId"`);
        await queryRunner.query(`DROP TABLE "wholesaler"`);
    }

}
