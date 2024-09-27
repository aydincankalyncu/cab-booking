import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressModule } from './address/address.module';
import { PriceModule } from './price/price.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    AddressModule,
    PriceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
