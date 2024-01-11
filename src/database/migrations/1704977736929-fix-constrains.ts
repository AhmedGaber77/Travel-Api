import { MigrationInterface, QueryRunner } from "typeorm";

export class FixConstrains1704977736929 implements MigrationInterface {
    name = 'FixConstrains1704977736929'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hotel" ("id" SERIAL NOT NULL, "hotelName" character varying NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_3a62ac86b369b36c1a297e9ab26" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."service_type_enum" AS ENUM('flight', 'hotel', 'transportation')`);
        await queryRunner.query(`CREATE TABLE "service" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "type" "public"."service_type_enum" NOT NULL, "description" character varying NOT NULL, "price" double precision NOT NULL, "savings" double precision, "isOffer" boolean DEFAULT false, "destination" character varying NOT NULL, "cancelationPolicy" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "wholesalerId" integer, "hotelId" integer, CONSTRAINT "unique_name" UNIQUE ("name"), CONSTRAINT "UQ_7806a14d42c3244064b4a1706ca" UNIQUE ("name"), CONSTRAINT "REL_3de0b4ddb9fbbd401a1cd2fd2f" UNIQUE ("hotelId"), CONSTRAINT "PK_85a21558c006647cd76fdce044b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "package" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "description" character varying, "price" double precision, "savings" double precision, "isOffer" boolean DEFAULT false, "destination" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "wholesalerId" integer, CONSTRAINT "unique_name" UNIQUE ("name"), CONSTRAINT "UQ_b23e12326a4218d09bd72301aa1" UNIQUE ("name"), CONSTRAINT "PK_308364c66df656295bc4ec467c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "status" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "path" character varying NOT NULL, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying, "password" character varying, "provider" character varying NOT NULL DEFAULT 'email', "socialId" character varying, "firstName" character varying, "lastName" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "photoId" uuid, "roleId" integer, "statusId" integer, "wholesalerId" integer, "travelOfficeId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9bd2fe7a8e694dedc4ec2f666f" ON "user" ("socialId") `);
        await queryRunner.query(`CREATE INDEX "IDX_58e4dbff0e1a32a9bdc861bb29" ON "user" ("firstName") `);
        await queryRunner.query(`CREATE INDEX "IDX_f0e1b4ecdca13b177e2e3a0613" ON "user" ("lastName") `);
        await queryRunner.query(`CREATE TABLE "wholesaler" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "contactInfo" json NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "address" character varying, "city" character varying, "state" character varying, "country" character varying, "postalCode" character varying(255), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_f9a076d19a6cb0ce6a135f8092d" UNIQUE ("email"), CONSTRAINT "UQ_6f662652b2e359cdb0dbf4214c0" UNIQUE ("phone"), CONSTRAINT "PK_1a69d581c4950536214fab59079" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "travel_office" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "contactInfo" json NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "address" character varying, "city" character varying, "state" character varying, "country" character varying, "postalCode" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "wholesalerId" integer, CONSTRAINT "UQ_996accdcc0d18ce857f8b4adde4" UNIQUE ("email"), CONSTRAINT "UQ_c9290c72dc3c055f48d4d5d18da" UNIQUE ("phone"), CONSTRAINT "PK_8e0c547ccdd7e175961f14e4e05" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "session" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3d2f174ef04fb312fdebd0ddc5" ON "session" ("userId") `);
        await queryRunner.query(`CREATE TABLE "package_services_service" ("packageId" integer NOT NULL, "serviceId" integer NOT NULL, CONSTRAINT "PK_a24f2e37bb60058642ce00ff96f" PRIMARY KEY ("packageId", "serviceId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_692754d0ae6fad46b8cdb1054b" ON "package_services_service" ("packageId") `);
        await queryRunner.query(`CREATE INDEX "IDX_cf8cb3b47fbc93646728a599a1" ON "package_services_service" ("serviceId") `);
        await queryRunner.query(`ALTER TABLE "service" ADD CONSTRAINT "FK_4e81b2b1efdd7626d904f12de75" FOREIGN KEY ("wholesalerId") REFERENCES "wholesaler"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service" ADD CONSTRAINT "FK_3de0b4ddb9fbbd401a1cd2fd2fd" FOREIGN KEY ("hotelId") REFERENCES "hotel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "package" ADD CONSTRAINT "FK_fc9fcd62cb0acb40f5287b8f663" FOREIGN KEY ("wholesalerId") REFERENCES "wholesaler"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_dc18daa696860586ba4667a9d31" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_2890454b64cdb3bf33c969ae235" FOREIGN KEY ("wholesalerId") REFERENCES "wholesaler"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_0fd64c4bb5640d8d9665e40c2f9" FOREIGN KEY ("travelOfficeId") REFERENCES "travel_office"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "travel_office" ADD CONSTRAINT "FK_ac1dce5e189e88a052a3b71d332" FOREIGN KEY ("wholesalerId") REFERENCES "wholesaler"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "package_services_service" ADD CONSTRAINT "FK_692754d0ae6fad46b8cdb1054bb" FOREIGN KEY ("packageId") REFERENCES "package"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "package_services_service" ADD CONSTRAINT "FK_cf8cb3b47fbc93646728a599a17" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "package_services_service" DROP CONSTRAINT "FK_cf8cb3b47fbc93646728a599a17"`);
        await queryRunner.query(`ALTER TABLE "package_services_service" DROP CONSTRAINT "FK_692754d0ae6fad46b8cdb1054bb"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`);
        await queryRunner.query(`ALTER TABLE "travel_office" DROP CONSTRAINT "FK_ac1dce5e189e88a052a3b71d332"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_0fd64c4bb5640d8d9665e40c2f9"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_2890454b64cdb3bf33c969ae235"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_dc18daa696860586ba4667a9d31"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f"`);
        await queryRunner.query(`ALTER TABLE "package" DROP CONSTRAINT "FK_fc9fcd62cb0acb40f5287b8f663"`);
        await queryRunner.query(`ALTER TABLE "service" DROP CONSTRAINT "FK_3de0b4ddb9fbbd401a1cd2fd2fd"`);
        await queryRunner.query(`ALTER TABLE "service" DROP CONSTRAINT "FK_4e81b2b1efdd7626d904f12de75"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cf8cb3b47fbc93646728a599a1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_692754d0ae6fad46b8cdb1054b"`);
        await queryRunner.query(`DROP TABLE "package_services_service"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3d2f174ef04fb312fdebd0ddc5"`);
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`DROP TABLE "travel_office"`);
        await queryRunner.query(`DROP TABLE "wholesaler"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f0e1b4ecdca13b177e2e3a0613"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_58e4dbff0e1a32a9bdc861bb29"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9bd2fe7a8e694dedc4ec2f666f"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "file"`);
        await queryRunner.query(`DROP TABLE "status"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "package"`);
        await queryRunner.query(`DROP TABLE "service"`);
        await queryRunner.query(`DROP TYPE "public"."service_type_enum"`);
        await queryRunner.query(`DROP TABLE "hotel"`);
    }

}
