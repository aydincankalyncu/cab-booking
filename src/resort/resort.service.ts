import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Resort } from '../schemas/resort-schema';
import { Model } from 'mongoose';
import { BaseResult } from '../utils/result/base-result';
import { SuccessResult } from '../utils/result/success-result';
import { ErrorResult } from '../utils/result/error-result';
import { CreateResortDto, UpdateResortDto } from './dtos';

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
  async create(createResortDto: CreateResortDto): Promise<BaseResult> {
    const {
      name,
      isActive,
      image,
      roundTripPrice,
      price,
      from,
      to,
      distance,
      car,
    } = createResortDto;
    try {
      const savedResort = new this.resortModel({
        name,
        isActive,
        image,
        roundTripPrice,
        price,
        from,
        to,
        distance,
        car,
      });
      await savedResort.save();
      return new SuccessResult('Success', savedResort);
    } catch (error) {
      return new ErrorResult('Error', error.message);
    }
  }
  async update(updateResortDto: UpdateResortDto): Promise<BaseResult> {
    const {
      id,
      name,
      isActive,
      image,
      roundTripPrice,
      price,
      from,
      to,
      distance,
      car,
    } = updateResortDto;
    try {
      const updatedResort = await this.resortModel.findById(id).exec();
      if (!updatedResort) {
        return new ErrorResult('There is no update resort', updateResortDto);
      }
      const updateFilter = {
        name: name,
        isActive: isActive,
        image: image,
        price: price,
        roundTripPrice: roundTripPrice,
        from: from,
        to: to,
        distance: distance,
        car: car,
      };
      const result = await this.resortModel.findOneAndUpdate(
        { id: id },
        updateFilter,
        { new: true },
      );
      return new SuccessResult('Success', result);
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
