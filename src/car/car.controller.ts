import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post
} from '@nestjs/common';
import { CarService } from './car.service';
import { BaseResult } from '../utils/result/base-result';
import { CreateCarDto, UpdateCarDto } from './dtos';

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
  async createCar(
    @Body() createCarDto: CreateCarDto,
  ): Promise<BaseResult> {
    return await this.carService.createCar(createCarDto);
  }
  @Post('update')
  async updateCar(
    @Body() updateCarDto: UpdateCarDto
  ): Promise<BaseResult> {
    return await this.carService.updateCar(updateCarDto);
  }
  @Delete(':id')
  async deleteCar(@Param('id') id: string): Promise<BaseResult> {
    return await this.carService.deleteCar(id);
  }
}
