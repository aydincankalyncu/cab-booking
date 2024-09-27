import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AddressPrice } from '../schemas/address-price-schema';
import { Model } from 'mongoose';
import { BaseResult } from '../utils/result/base-result';
import { SuccessResult } from '../utils/result/success-result';
import { ErrorResult } from '../utils/result/error-result';

@Injectable()
export class PriceService {
  constructor(
    @InjectModel(AddressPrice.name)
    private readonly priceModel: Model<AddressPrice>,
  ) {}

  async getAllPrices(): Promise<BaseResult> {
    try {
      const result = await this.priceModel
        .find()
        .populate('from', 'name')
        .populate('to', 'name')
        .exec();
      return new SuccessResult('Success', result);
    } catch (error) {
      return new ErrorResult('Error', error.message);
    }
  }

  async getPriceById(id: string): Promise<BaseResult> {
    try {
      const addressPrice = await this.priceModel.findById(id).exec();
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

  async deletePrice(id: string): Promise<BaseResult> {
    try {
      const deletedAddressPrice = await this.priceModel.findByIdAndDelete(id);
      return new SuccessResult(`Successfully was deleted`, deletedAddressPrice);
    } catch (error) {
      return new ErrorResult('Error', error.message);
    }
  }
}
