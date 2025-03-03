import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Resort } from '../schemas/resort-schema';
import { Model } from 'mongoose';
import { BaseResult } from '../utils/result/base-result';
import { SuccessResult } from '../utils/result/success-result';
import { ErrorResult } from '../utils/result/error-result';
import { CarDto, CreateResortDto, UpdateResortDto } from './dtos';
import { join } from 'path';
import * as fs from 'fs';

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
    file: Express.Multer.File,
    createResortDto: CreateResortDto,
  ): Promise<BaseResult> {
    const { name, isActive, liveCamUrl, startDestination, endDestination, description, travelTime, distance, cars } =
      createResortDto;
    try {
      let image = '';

      if (file) {
        const imagePath = `uploads/resorts/${file.originalname}`;
        image = imagePath;

        await this.saveImage(file, imagePath);
      }

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
    file: Express.Multer.File,
    updateResortDto: UpdateResortDto,
  ): Promise<BaseResult> {
    const {
      id,
      name,
      isActive,
      startDestination, liveCamUrl, endDestination, description, travelTime, distance, cars
    } = updateResortDto;
    try {
      const updatedResort = await this.resortModel.findById(id).exec();
      if (!updatedResort) {
        return new ErrorResult('There is no update resort', updateResortDto);
      }

      let image = updatedResort.image;
      if (file) {
        await this.deleteFile(updatedResort.image);
        const imagePath = `uploads/cars/${file.originalname}`;
        image = imagePath;
        await this.saveImage(file, imagePath);
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
      if (result.image) {
        await this.deleteFile(result.image);
      }
      return new SuccessResult('Success', result);
    } catch (error) {
      return new ErrorResult('Error', error.message);
    }
  }

  async deleteFile(image: string): Promise<void> {
    const filePath = join(__dirname, '..', '..', 'uploads', 'resorts', image);
    try {
      await fs.promises.unlink(filePath); // Delete file.
      console.log('File deleted:', filePath);
    } catch (error) {
      if (error.code === 'ENOENT') {
        // If there is no file
        console.log('File not found, so not deleted:', filePath);
      } else {
        console.error('Error while deleting file:', error);
      }
    }
  }

  private async saveImage(
    file: Express.Multer.File,
    imagePath: string,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(imagePath, file.buffer, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}
