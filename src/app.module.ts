import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressModule } from './address/address.module';
import { LocationModule } from './price/location.module';
import { CarModule } from './car/car.module';
import { ResortModule } from './resort/resort.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { ReservationModule } from './reservation/reservation.module';
import { EmailModule } from './email/email.module';
import { StatsModule } from './stats/stats.module';
import { SiteconfigModule } from './siteconfig/siteconfig.module';
import { EditorModule } from './editor/editor.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://innsbruck:InnsbruckTaxi!.@mycluster.fbnnw.mongodb.net/taxi-booking?retryWrites=true&w=majority&appName=MyCluster',
    ),
    AddressModule,
    LocationModule,
    CarModule,
    ResortModule,
    ReservationModule,
    EmailModule,
    StatsModule,
    SiteconfigModule,
    EditorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
