import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Car } from '../schemas/car-schema';
import { Model } from 'mongoose';
import { BaseResult } from '../utils/result/base-result';
import { SuccessResult } from '../utils/result/success-result';
import { ErrorResult } from '../utils/result/error-result';
import { CreateCarDto, UpdateCarDto } from './dtos';

@Injectable()
export class CarService {
  constructor(@InjectModel(Car.name) private readonly carModel: Model<Car>) {}
  async getAll(): Promise<BaseResult> {
    try {
      const carList = await this.carModel.find().exec();
      return new SuccessResult('Success', carList);
    } catch (error) {
      return new ErrorResult('Error', error.message);
    }
  }
  async getById(id: string): Promise<BaseResult> {
    try {
      const result = await this.carModel.findById(id).exec();
      if (!result) {
        return new ErrorResult('There is no car.', id);
      }
      return new SuccessResult('Success', result);
    } catch (error) {
      return new ErrorResult('Error', error.message);
    }
  }
  async createCar(
    createCarDto: CreateCarDto,
  ): Promise<BaseResult> {
    const { name, isActive, description, luggage, capacity, image } = createCarDto;
    try {
      const savedCar = new this.carModel({
        name,
        isActive,
        description,
        luggage,
        capacity,
        image,
      });
      await savedCar.save();
      return new SuccessResult('Success', savedCar);
    } catch (error) {
      return new ErrorResult('Error', error.message);
    }
  }
  async updateCar(
    updateCarDto: UpdateCarDto,
  ): Promise<BaseResult> {
    const { id, name, isActive, description, luggage, capacity, image } = updateCarDto;
    try {
      const car = await this.carModel.findById(id).exec();
      if (!car) {
        return new ErrorResult('There is no car.', id);
      }
      const updateFilter = {
        name: name,
        isActive: isActive,
        description: description,
        luggage: luggage,
        capacity: capacity,
        image: image,
      };
      const result = await this.carModel.findOneAndUpdate(
        { _id: id },
        updateFilter,
        { new: true },
      );
      return new SuccessResult('Success', result);
    } catch (error) {
      return new ErrorResult('Error', error.message);
    }
  }
  async deleteCar(id: string): Promise<BaseResult> {
    try {
      const result = await this.carModel.findByIdAndDelete(id);
      return new SuccessResult('Success', result);
    } catch (error) {
      return new ErrorResult('Error', error.message);
    }
  }
}