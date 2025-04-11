import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Resort } from '../schemas/resort-schema';
import { Model } from 'mongoose';
import { BaseResult } from '../utils/result/base-result';
import { SuccessResult } from '../utils/result/success-result';
import { ErrorResult } from '../utils/result/error-result';
import { CarDto, CreateResortDto, UpdateResortDto } from './dtos';

@Injectable()
export class ResortService {
  constructor(
    @InjectModel(Resort.name) private readonly resortModel: Model<Resort>,
  ) {}
  async getAll(): Promise<BaseResult> {
    try {
      const result = await this.resortModel.find().exec();
      return new SuccessResult('Success', result);
    } catch (error) {
      return new ErrorResult('Error', error.message);
    }
  }
  async getById(id: string): Promise<BaseResult> {
    try {
      const resort = await this.resortModel.findById(id).exec();
      if (!resort) {
        return new ErrorResult('There is no resort', id);
      }
      return new SuccessResult('Success', resort);
    } catch (error) {
      return new ErrorResult('Error', error.message);
    }
  }
  async create(
    createResortDto: CreateResortDto,
  ): Promise<BaseResult> {
    const { name, image, isActive, liveCamUrl, startDestination, endDestination, description, travelTime, distance, cars } =
      createResortDto;
    try {
    
      const parsedCars = JSON.parse(cars) as CarDto[];
      const newResort = new this.resortModel({
        name,
        isActive,
        image,
        liveCamUrl,
        startingPoint: startDestination,
        destination: endDestination,
        duration: travelTime,
        distance,
        description,
        cars: parsedCars?.map((car) => ({
          carId: car.id,
          name: car.name,
          priceOneWay: car.priceOneWay,
          priceOneWayDiscount: car.priceOneWayDiscount,
          priceDoubleWay: car.priceDoubleWay,
          priceDoubleWayDiscount: car.priceDoubleWayDiscount,
        })),
      });

      const savedResort = await this.resortModel.insertMany(newResort);

      return new SuccessResult('Success', savedResort);
    } catch (error) {
      return new ErrorResult('Error', error.message);
    }
  }
  async update(
    updateResortDto: UpdateResortDto,
  ): Promise<BaseResult> {
    const {
      id,
      name,
      image,
      isActive,
      startDestination, liveCamUrl, endDestination, description, travelTime, distance, cars
    } = updateResortDto;
    try {
      const updatedResort = await this.resortModel.findById(id).exec();
      if (!updatedResort) {
        return new ErrorResult('There is no update resort', updateResortDto);
      }

      const parsedCars = JSON.parse(cars) as CarDto[];

      const updatedResortResult = await this.resortModel.findByIdAndUpdate(
        id,
        {
          name,
          isActive,
          image,
          startingPoint: startDestination,
          destination: endDestination,
          duration: travelTime,
          distance,
          description,
          liveCamUrl,
          cars: parsedCars?.map((car) => ({
            carId: car.id,
            name: car.name,
            priceOneWay: car.priceOneWay,
            priceOneWayDiscount: car.priceOneWayDiscount,
            priceDoubleWay: car.priceDoubleWay,
            priceDoubleWayDiscount: car.priceDoubleWayDiscount,
          })),
        },
        { new: true },
      );
      
      return new SuccessResult('Success', updatedResortResult);
    } catch (error) {
      return new ErrorResult('Error', error.message);
    }
  }
  async delete(id: string): Promise<BaseResult> {
    try {
      const result = await this.resortModel.findByIdAndDelete(id);
      return new SuccessResult('Success', result);
    } catch (error) {
      return new ErrorResult('Error', error.message);
    }
  }
}