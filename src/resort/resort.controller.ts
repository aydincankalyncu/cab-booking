import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ResortService } from './resort.service';
import { BaseResult } from '../utils/result/base-result';
import { CreateResortDto, UpdateResortDto } from './dtos';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('resorts')
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
  @UseInterceptors(FileInterceptor('file'))
  async createResort(
    @Body() createResortDto: CreateResortDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<BaseResult> {
    return await this.resortService.create(file, createResortDto);
  }
  @Post('update')
  @UseInterceptors(FileInterceptor('file'))
  async updateResort(
    @Body() updateResortDto: UpdateResortDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<BaseResult> {
    return await this.resortService.update(file, updateResortDto);
  }

  @Delete(':id')
  async deleteResort(@Param('id') id: string): Promise<BaseResult> {
    return await this.resortService.delete(id);
  }
}
