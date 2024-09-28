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
import { diskStorage } from 'multer';
import { extname } from 'path';

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
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/cars',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async createCar(
    @Body() createCarDto: CreateCarDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<BaseResult> {
    createCarDto.image = file ? `/uploads/cars/${file.filename}` : null;
    return await this.carService.createCar(createCarDto);
  }
  @Post('update')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/cars',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async updateCar(
    @Body() updateCarDto: UpdateCarDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<BaseResult> {
    updateCarDto.image = file ? `/uploads/cars/${file.filename}` : null;
    return await this.carService.updateCar(updateCarDto);
  }
  @Delete(':id')
  async deleteCar(@Param('id') id: string): Promise<BaseResult> {
    return await this.carService.deleteCar(id);
  }
}
