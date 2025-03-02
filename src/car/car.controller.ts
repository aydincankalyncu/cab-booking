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
import { CarService } from './car.service';
import { BaseResult } from '../utils/result/base-result';
import { CreateCarDto, UpdateCarDto } from './dtos';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}
  @Get()
  async getCars(): Promise<BaseResult> {
    return await this.carService.getAll();
  }
  @Get(':id')
  async getCar(@Param('id') id: string): Promise<BaseResult> {
    return await this.carService.getById(id);
  }
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createCar(
    @Body() createCarDto: CreateCarDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<BaseResult> {
    return await this.carService.createCar(file, createCarDto);
  }
  @Post('update')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        if (!file) {
          cb(null, false);
        } else {
          cb(null, true);
        }
      },
    }),
  )
  async updateCar(
    @Body() updateCarDto: UpdateCarDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<BaseResult> {
    return await this.carService.updateCar(file, updateCarDto);
  }
  @Delete(':id')
  async deleteCar(@Param('id') id: string): Promise<BaseResult> {
    return await this.carService.deleteCar(id);
  }
}
