import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StatsSchema } from 'src/schemas/stats-schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Stats', schema: StatsSchema}])],
  providers: [StatsService],
  controllers: [StatsController]
})
export class StatsModule {}
