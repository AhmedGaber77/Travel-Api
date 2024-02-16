import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAllTables1708043524457 implements MigrationInterface {
  name = 'CreateAllTables1708043524457';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cruise" ("id" SERIAL NOT NULL, "depratureCity" character varying NOT NULL, "depratureCountry" character varying NOT NULL, "depratureAddress" character varying NOT NULL, "depratureTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP NOT NULL, "cabinType" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_b73c9dc2c9971c37fbd437112cb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "flight" ("id" SERIAL NOT NULL, "airline" character varying NOT NULL, "departureAddress" character varying NOT NULL, "arrivalAddress" character varying NOT NULL, "departureTime" TIMESTAMP NOT NULL, "arrivalTime" TIMESTAMP NOT NULL, "seatType" character varying NOT NULL, "description" character varying, "departureCity" character varying NOT NULL, "arrivalCity" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_bf571ce6731cf071fc51b94df03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "amount" integer NOT NULL, "transactionDate" TIMESTAMP NOT NULL, "transactionTime" TIMESTAMP NOT NULL, "description" character varying NOT NULL, "currency" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "accountId" integer, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "account" ("id" SERIAL NOT NULL, "currentBalance" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "status" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "path" character varying NOT NULL, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying, "password" character varying, "provider" character varying NOT NULL DEFAULT 'email', "socialId" character varying, "firstName" character varying, "lastName" character varying, "wholesalerId" integer, "travelOfficeId" integer, "profilePhotoId" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "photoId" uuid, "roleId" integer, "statusId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_87b40c02a70fd210bead07c854" UNIQUE ("profilePhotoId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9bd2fe7a8e694dedc4ec2f666f" ON "user" ("socialId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_58e4dbff0e1a32a9bdc861bb29" ON "user" ("firstName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f0e1b4ecdca13b177e2e3a0613" ON "user" ("lastName") `,
    );
    await queryRunner.query(
      `CREATE TABLE "traveler" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying, "mobilePhone" character varying NOT NULL, "reservationId" integer, CONSTRAINT "PK_17be9195f4528e39046d352f3c6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."reservation_status_enum" AS ENUM('pending', 'confirmed', 'canceled')`,
    );
    await queryRunner.query(
      `CREATE TABLE "reservation" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "status" "public"."reservation_status_enum" NOT NULL DEFAULT 'pending', "checkInDate" TIMESTAMP NOT NULL, "checkOutDate" TIMESTAMP, "CancelReason" character varying, "travelOfficeId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "serviceId" integer, "userId" integer, CONSTRAINT "PK_48b1f9922368359ab88e8bfa525" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "travel_office" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "address" character varying, "city" character varying, "state" character varying, "country" character varying, "postalCode" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "wholesalerId" integer, "profilePhotoId" integer, "accountId" integer, CONSTRAINT "UQ_996accdcc0d18ce857f8b4adde4" UNIQUE ("email"), CONSTRAINT "UQ_c9290c72dc3c055f48d4d5d18da" UNIQUE ("phone"), CONSTRAINT "REL_44645389a239999df0d63a6702" UNIQUE ("profilePhotoId"), CONSTRAINT "REL_f42d0bb8bf6fa1414a3816b170" UNIQUE ("accountId"), CONSTRAINT "PK_8e0c547ccdd7e175961f14e4e05" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "wholesaler" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "contactInfo" json NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "address" character varying, "city" character varying, "state" character varying, "country" character varying, "postalCode" character varying(255), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_639c1a7d51da229ddc9fc1000e6" UNIQUE ("name"), CONSTRAINT "UQ_f9a076d19a6cb0ce6a135f8092d" UNIQUE ("email"), CONSTRAINT "UQ_6f662652b2e359cdb0dbf4214c0" UNIQUE ("phone"), CONSTRAINT "PK_1a69d581c4950536214fab59079" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f9a076d19a6cb0ce6a135f8092" ON "wholesaler" ("email") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6f662652b2e359cdb0dbf4214c" ON "wholesaler" ("phone") `,
    );
    await queryRunner.query(
      `CREATE TABLE "package" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "description" character varying, "price" double precision, "savings" double precision, "isOffer" boolean DEFAULT false, "destination" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "wholesalerId" integer, CONSTRAINT "UQ_b23e12326a4218d09bd72301aa1" UNIQUE ("name"), CONSTRAINT "PK_308364c66df656295bc4ec467c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "safari" ("id" SERIAL NOT NULL, "includes" character varying NOT NULL, "excludes" character varying NOT NULL, "days" integer NOT NULL, "startTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP NOT NULL, "city" character varying NOT NULL, "country" character varying NOT NULL, "address" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_8e9a7e4d19a98e7a0d81648d6ad" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "package_day" ("id" SERIAL NOT NULL, "dayName" character varying NOT NULL, "dayDescription" character varying NOT NULL, "standardPackageId" integer, CONSTRAINT "PK_e86c7fb79167e129a065d2f048d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "standard_package" ("id" SERIAL NOT NULL, "included" character varying NOT NULL, "excluded" character varying NOT NULL, CONSTRAINT "PK_f9f2c036738a51489ed08f14157" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "transportation" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "description" character varying, "departureAddress" character varying, "arrivalAddress" character varying, "departureTime" TIMESTAMP, "arrivalTime" TIMESTAMP, CONSTRAINT "PK_d7f91167cda8f3f83929b7892fb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "service" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "description" character varying NOT NULL, "price" double precision NOT NULL, "quantityAvailable" integer NOT NULL, "savings" double precision, "isOffer" boolean DEFAULT false, "cancellationPolicy" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "wholesalerId" integer, "roomId" integer, "flightId" integer, "transportationId" integer, "safariId" integer, "cruiseId" integer, "standardPackageId" integer, CONSTRAINT "UQ_7806a14d42c3244064b4a1706ca" UNIQUE ("name"), CONSTRAINT "REL_aa703096690604db294a297b9f" UNIQUE ("roomId"), CONSTRAINT "REL_a93be6f310b42a8b8edcf9a19a" UNIQUE ("flightId"), CONSTRAINT "REL_96a15506ebe23c2ca229bed74d" UNIQUE ("transportationId"), CONSTRAINT "REL_e7e8ac2e2f76dd0acc744a9cb0" UNIQUE ("safariId"), CONSTRAINT "REL_f9bc2e4ff12449fd178bf11e07" UNIQUE ("cruiseId"), CONSTRAINT "REL_1be1b8c380d277a230e27427e9" UNIQUE ("standardPackageId"), CONSTRAINT "PK_85a21558c006647cd76fdce044b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7806a14d42c3244064b4a1706c" ON "service" ("name") `,
    );
    await queryRunner.query(
      `CREATE TABLE "room" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "roomArea" integer NOT NULL, "numberOfBeds" integer NOT NULL, "numberOfSleeps" integer NOT NULL, "hotelId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "hotel" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "zipCode" character varying, "mobileNumber" character varying, "phoneNumber" character varying, "website" character varying, "email" character varying, "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_3a62ac86b369b36c1a297e9ab26" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "gallery" ("id" SERIAL NOT NULL, "imageUrl" character varying NOT NULL, "serviceId" integer, "hotelId" integer, CONSTRAINT "PK_65d7a1ef91ddafb3e7071b188a0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "session" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3d2f174ef04fb312fdebd0ddc5" ON "session" ("userId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "package_services_service" ("packageId" integer NOT NULL, "serviceId" integer NOT NULL, CONSTRAINT "PK_a24f2e37bb60058642ce00ff96f" PRIMARY KEY ("packageId", "serviceId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_692754d0ae6fad46b8cdb1054b" ON "package_services_service" ("packageId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cf8cb3b47fbc93646728a599a1" ON "package_services_service" ("serviceId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD CONSTRAINT "FK_3d6e89b14baa44a71870450d14d" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_dc18daa696860586ba4667a9d31" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_2890454b64cdb3bf33c969ae235" FOREIGN KEY ("wholesalerId") REFERENCES "wholesaler"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_0fd64c4bb5640d8d9665e40c2f9" FOREIGN KEY ("travelOfficeId") REFERENCES "travel_office"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_87b40c02a70fd210bead07c854c" FOREIGN KEY ("profilePhotoId") REFERENCES "gallery"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "traveler" ADD CONSTRAINT "FK_a6f3965c00d031e20a59dc0f6bf" FOREIGN KEY ("reservationId") REFERENCES "reservation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" ADD CONSTRAINT "FK_0180e58c9266df567fe8161947c" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" ADD CONSTRAINT "FK_8ca9ef22e0739d04fbfad50dae4" FOREIGN KEY ("travelOfficeId") REFERENCES "travel_office"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" ADD CONSTRAINT "FK_529dceb01ef681127fef04d755d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "travel_office" ADD CONSTRAINT "FK_ac1dce5e189e88a052a3b71d332" FOREIGN KEY ("wholesalerId") REFERENCES "wholesaler"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "travel_office" ADD CONSTRAINT "FK_44645389a239999df0d63a6702f" FOREIGN KEY ("profilePhotoId") REFERENCES "gallery"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "travel_office" ADD CONSTRAINT "FK_f42d0bb8bf6fa1414a3816b1707" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "package" ADD CONSTRAINT "FK_fc9fcd62cb0acb40f5287b8f663" FOREIGN KEY ("wholesalerId") REFERENCES "wholesaler"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "package_day" ADD CONSTRAINT "FK_aa8fefd504976c7660cd59a3162" FOREIGN KEY ("standardPackageId") REFERENCES "standard_package"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" ADD CONSTRAINT "FK_4e81b2b1efdd7626d904f12de75" FOREIGN KEY ("wholesalerId") REFERENCES "wholesaler"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" ADD CONSTRAINT "FK_aa703096690604db294a297b9f5" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" ADD CONSTRAINT "FK_a93be6f310b42a8b8edcf9a19ab" FOREIGN KEY ("flightId") REFERENCES "flight"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" ADD CONSTRAINT "FK_96a15506ebe23c2ca229bed74db" FOREIGN KEY ("transportationId") REFERENCES "transportation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" ADD CONSTRAINT "FK_e7e8ac2e2f76dd0acc744a9cb07" FOREIGN KEY ("safariId") REFERENCES "safari"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" ADD CONSTRAINT "FK_f9bc2e4ff12449fd178bf11e073" FOREIGN KEY ("cruiseId") REFERENCES "cruise"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" ADD CONSTRAINT "FK_1be1b8c380d277a230e27427e95" FOREIGN KEY ("standardPackageId") REFERENCES "standard_package"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "room" ADD CONSTRAINT "FK_2fac52abaa01b54156539cad11c" FOREIGN KEY ("hotelId") REFERENCES "hotel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "gallery" ADD CONSTRAINT "FK_fc532215afdb59ca10b3157102c" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "gallery" ADD CONSTRAINT "FK_9ff4f6b7693f8fdbdf82eb680f8" FOREIGN KEY ("hotelId") REFERENCES "hotel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "package_services_service" ADD CONSTRAINT "FK_692754d0ae6fad46b8cdb1054bb" FOREIGN KEY ("packageId") REFERENCES "package"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "package_services_service" ADD CONSTRAINT "FK_cf8cb3b47fbc93646728a599a17" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "package_services_service" DROP CONSTRAINT "FK_cf8cb3b47fbc93646728a599a17"`,
    );
    await queryRunner.query(
      `ALTER TABLE "package_services_service" DROP CONSTRAINT "FK_692754d0ae6fad46b8cdb1054bb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`,
    );
    await queryRunner.query(
      `ALTER TABLE "gallery" DROP CONSTRAINT "FK_9ff4f6b7693f8fdbdf82eb680f8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "gallery" DROP CONSTRAINT "FK_fc532215afdb59ca10b3157102c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "room" DROP CONSTRAINT "FK_2fac52abaa01b54156539cad11c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" DROP CONSTRAINT "FK_1be1b8c380d277a230e27427e95"`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" DROP CONSTRAINT "FK_f9bc2e4ff12449fd178bf11e073"`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" DROP CONSTRAINT "FK_e7e8ac2e2f76dd0acc744a9cb07"`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" DROP CONSTRAINT "FK_96a15506ebe23c2ca229bed74db"`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" DROP CONSTRAINT "FK_a93be6f310b42a8b8edcf9a19ab"`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" DROP CONSTRAINT "FK_aa703096690604db294a297b9f5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" DROP CONSTRAINT "FK_4e81b2b1efdd7626d904f12de75"`,
    );
    await queryRunner.query(
      `ALTER TABLE "package_day" DROP CONSTRAINT "FK_aa8fefd504976c7660cd59a3162"`,
    );
    await queryRunner.query(
      `ALTER TABLE "package" DROP CONSTRAINT "FK_fc9fcd62cb0acb40f5287b8f663"`,
    );
    await queryRunner.query(
      `ALTER TABLE "travel_office" DROP CONSTRAINT "FK_f42d0bb8bf6fa1414a3816b1707"`,
    );
    await queryRunner.query(
      `ALTER TABLE "travel_office" DROP CONSTRAINT "FK_44645389a239999df0d63a6702f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "travel_office" DROP CONSTRAINT "FK_ac1dce5e189e88a052a3b71d332"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" DROP CONSTRAINT "FK_529dceb01ef681127fef04d755d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" DROP CONSTRAINT "FK_8ca9ef22e0739d04fbfad50dae4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" DROP CONSTRAINT "FK_0180e58c9266df567fe8161947c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "traveler" DROP CONSTRAINT "FK_a6f3965c00d031e20a59dc0f6bf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_87b40c02a70fd210bead07c854c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_0fd64c4bb5640d8d9665e40c2f9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_2890454b64cdb3bf33c969ae235"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_dc18daa696860586ba4667a9d31"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP CONSTRAINT "FK_3d6e89b14baa44a71870450d14d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cf8cb3b47fbc93646728a599a1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_692754d0ae6fad46b8cdb1054b"`,
    );
    await queryRunner.query(`DROP TABLE "package_services_service"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3d2f174ef04fb312fdebd0ddc5"`,
    );
    await queryRunner.query(`DROP TABLE "session"`);
    await queryRunner.query(`DROP TABLE "gallery"`);
    await queryRunner.query(`DROP TABLE "hotel"`);
    await queryRunner.query(`DROP TABLE "room"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7806a14d42c3244064b4a1706c"`,
    );
    await queryRunner.query(`DROP TABLE "service"`);
    await queryRunner.query(`DROP TABLE "transportation"`);
    await queryRunner.query(`DROP TABLE "standard_package"`);
    await queryRunner.query(`DROP TABLE "package_day"`);
    await queryRunner.query(`DROP TABLE "safari"`);
    await queryRunner.query(`DROP TABLE "package"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6f662652b2e359cdb0dbf4214c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f9a076d19a6cb0ce6a135f8092"`,
    );
    await queryRunner.query(`DROP TABLE "wholesaler"`);
    await queryRunner.query(`DROP TABLE "travel_office"`);
    await queryRunner.query(`DROP TABLE "reservation"`);
    await queryRunner.query(`DROP TYPE "public"."reservation_status_enum"`);
    await queryRunner.query(`DROP TABLE "traveler"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f0e1b4ecdca13b177e2e3a0613"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_58e4dbff0e1a32a9bdc861bb29"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9bd2fe7a8e694dedc4ec2f666f"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "file"`);
    await queryRunner.query(`DROP TABLE "status"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "account"`);
    await queryRunner.query(`DROP TABLE "transaction"`);
    await queryRunner.query(`DROP TABLE "flight"`);
    await queryRunner.query(`DROP TABLE "cruise"`);
  }
}
