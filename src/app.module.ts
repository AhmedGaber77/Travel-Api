import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './database/config/database.config';
import authConfig from './auth/config/auth.config';
import appConfig from './config/app.config';
import mailConfig from './mail/config/mail.config';
import fileConfig from './files/config/file.config';
import path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nModule } from 'nestjs-i18n/dist/i18n.module';
import { HeaderResolver } from 'nestjs-i18n';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { MailModule } from './mail/mail.module';
import { HomeModule } from './home/home.module';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AllConfigType } from './config/config.type';
import { SessionModule } from './session/session.module';
import { MailerModule } from './mailer/mailer.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './database/mongoose-config.service';
import { DatabaseConfig } from './database/config/database-config.type';
import { WholesalersModule } from './modules/wholesalers/wholesalers.module';
import { TravelOfficesModule } from './modules/travel-offices/travel-offices.module';
import { PackagesModule } from './modules/packages/packages.module';
import { ServicesModule } from './modules/services/services.module';
import { HotelsModule } from './modules/hotels/hotels.module';
import { FlightsModule } from './modules/flights/flights.module';
import { TransportationsModule } from './modules/transportations/transportations.module';
import { IsUniqueConstraint } from './validators/unique-field.validator';
import { CruisesModule } from './modules/cruises/cruises.module';
import { SafariModule } from './modules/safari/safari.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ImageUploadModule } from './image-upload/image-upload.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { AccountsModule } from './modules/accounts/accounts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig, appConfig, mailConfig, fileConfig],
      envFilePath: ['.env'],
    }),
    (databaseConfig() as DatabaseConfig).isDocumentDatabase
      ? MongooseModule.forRootAsync({
          useClass: MongooseConfigService,
        })
      : TypeOrmModule.forRootAsync({
          useClass: TypeOrmConfigService,
          dataSourceFactory: async (options: DataSourceOptions) => {
            return new DataSource(options).initialize();
          },
        }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
          infer: true,
        }),
        loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true },
      }),
      resolvers: [
        {
          use: HeaderResolver,
          useFactory: (configService: ConfigService<AllConfigType>) => {
            return [
              configService.get('app.headerLanguage', {
                infer: true,
              }),
            ];
          },
          inject: [ConfigService],
        },
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    UsersModule,
    FilesModule,
    AuthModule,
    SessionModule,
    MailModule,
    MailerModule,
    HomeModule,
    WholesalersModule,
    TravelOfficesModule,
    PackagesModule,
    ServicesModule,
    HotelsModule,
    FlightsModule,
    TransportationsModule,
    CruisesModule,
    SafariModule,
    CloudinaryModule,
    ImageUploadModule,
    ReservationsModule,
    AccountsModule,
  ],
  providers: [IsUniqueConstraint],
})
export class AppModule {}
