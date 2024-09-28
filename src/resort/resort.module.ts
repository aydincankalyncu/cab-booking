import { Module } from '@nestjs/common';
import { ResortService } from './resort.service';
import { ResortController } from './resort.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ResortSchema } from '../schemas/resort-schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Resort', schema: ResortSchema }]),
  ],
  providers: [ResortService],
  controllers: [ResortController],
})
export class ResortModule {}
