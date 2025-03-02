import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseResult } from '../utils/result/base-result';
import { SuccessResult } from '../utils/result/success-result';
import { ErrorResult } from '../utils/result/error-result';
import { UpdateLocationDto, CreateLocationDto } from './dtos';
import { Location as LocationModel } from 'src/schemas/location-schema';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(LocationModel.name)
    private readonly locationModel: Model<LocationModel>,
  ) {}

  async getAllLocations(): Promise<BaseResult> {
    try {
      const result = await this.locationModel.find().exec();
      return new SuccessResult('Success', result);
    } catch (error) {
      return new ErrorResult('Error', error.message);
    }
  }

  async getLocationById(id: string): Promise<BaseResult> {
    try {
      const addressPrice = await this.locationModel.findById(id).exec();
      if (!addressPrice) {
        return new ErrorResult('There is no address price', id);
      }
      return new SuccessResult('Success', addressPrice);
    } catch (error) {
      return new ErrorResult(
        'Error occured on getting address price by id',
        error,
      );
    }
  }

  async deleteLocation(id: string): Promise<BaseResult> {
    try {
      const deletedAddressPrice =
        await this.locationModel.findByIdAndDelete(id);
      return new SuccessResult(`Successfully was deleted`, deletedAddressPrice);
    } catch (error) {
      return new ErrorResult('Error', error.message);
    }
  }
  async createLocation(createPriceDto: CreateLocationDto): Promise<BaseResult> {
    const { startDestination, endDestination, description, travelTime, isActive, distance, cars } =
      createPriceDto;
    try {
      const newLocation = new this.locationModel({
        startingPoint: startDestination,
        destination: endDestination,
        duration: travelTime,
        isActive,
        distance,
        description,
        cars: cars.map((car) => ({
          carId: car.id,
          name: car.name,
          priceOneWay: car.priceOneWay,
          priceOneWayDiscount: car.priceOneWayDiscount,
          priceDoubleWay: car.priceDoubleWay,
          priceDoubleWayDiscount: car.priceDoubleWayDiscount,
        })),
      });

      const savedPrices = await this.locationModel.insertMany(newLocation);
      return new SuccessResult(`Prices successfully created`, savedPrices);
    } catch (error) {
      return new ErrorResult('Error while creating prices', error.message);
    }
  }

  async updateLocation(updatePriceDto: UpdateLocationDto): Promise<BaseResult> {
    const { id, startDestination, endDestination, description, isActive, travelTime, distance, cars } 
    = updatePriceDto;
    try {
      const updatedPrices = await this.locationModel.findByIdAndUpdate(
        id,
        {
          startingPoint: startDestination,
          destination: endDestination,
          duration: travelTime,
          isActive,
          distance,
          description,
          cars: cars.map((car) => ({
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
      return new SuccessResult(`Prices successfully updated`, updatedPrices);
    } catch (error) {
      return new ErrorResult('Error while updating prices', error.message);
    }
  }
}
