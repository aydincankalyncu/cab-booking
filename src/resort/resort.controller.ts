import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ResortService } from './resort.service';
import { BaseResult } from '../utils/result/base-result';
import { CreateResortDto, UpdateResortDto } from './dtos';

@Controller('resort')
export class ResortController {
  constructor(private readonly resortService: ResortService) {}
  @Get()
  async getResorts(): Promise<BaseResult> {
    return await this.resortService.getAll();
  }
  @Get(':id')
  async getResortById(@Param('id') id: string): Promise<BaseResult> {
    return await this.resortService.getById(id);
  }
  @Post()
  async createResort(
    @Body() createResortDto: CreateResortDto,
  ): Promise<BaseResult> {
    return await this.resortService.create(createResortDto);
  }
  @Post('update')
  async updateResort(
    @Body() updateResortDto: UpdateResortDto,
  ): Promise<BaseResult> {
    return await this.resortService.update(updateResortDto);
  }
  @Delete(':id')
  async deleteResort(@Param('id') id: string): Promise<BaseResult> {
    return await this.resortService.delete(id);
  }
}
