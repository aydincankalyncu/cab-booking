import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stats } from 'src/schemas/stats-schema';
import { BaseResult } from 'src/utils/result/base-result';
import { ErrorResult } from 'src/utils/result/error-result';
import { SuccessResult } from 'src/utils/result/success-result';
import { CreateStatsDto } from './dtos';

@Injectable()
export class StatsService {
    constructor(@InjectModel(Stats.name) private readonly statsModel: Model<Stats>) {}

    async getAll(): Promise<BaseResult> {
        try {
            const stats = await this.statsModel.find().exec();
            return new SuccessResult('Success', stats);
        } catch (error) {
            return new ErrorResult('Error', error.message);
        }
    }

    async createStat(createStatDto: CreateStatsDto) : Promise<BaseResult> {
        try {

            const stat = await this.statsModel.findOne({query: createStatDto.query}).exec();

            if (stat)
            {
                return new ErrorResult(`Error, stat already defined. ${createStatDto.query}`, stat);
            }
            const savedStat = new this.statsModel({
                ...createStatDto
            });
            await savedStat.save();
            return new SuccessResult('Success', savedStat);
        } catch (error) {
            return new ErrorResult('Error', error.message);
        }
    }
}
