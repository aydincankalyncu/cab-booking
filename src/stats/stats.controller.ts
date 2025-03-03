import { Body, Controller, Get, Post } from '@nestjs/common';
import { StatsService } from './stats.service';
import { BaseResult } from 'src/utils/result/base-result';
import { CreateStatsDto } from './dtos';

@Controller('stats')
export class StatsController {
    constructor(private readonly statService: StatsService) {}

    @Get()
    async getStats() : Promise<BaseResult> {
        return await this.statService.getAll();
    }

    @Post()
    async createStat(
        @Body() createStatsDto: CreateStatsDto
    ): Promise<BaseResult> {
        return await this.statService.createStat(createStatsDto);
    }
}
