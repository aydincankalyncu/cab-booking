import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Address } from '../schemas/address-schema';
import { Model } from 'mongoose';
import { BaseResult } from '../utils/result/base-result';
import { SuccessResult } from '../utils/result/success-result';
import { ErrorResult } from '../utils/result/error-result';
import { CreateAddressDto, UpdateAddressDto } from './dtos';

// TODO Create and update sections will implement.

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name) private readonly addressModel: Model<Address>,
  ) {}

  async getAddresses(): Promise<BaseResult> {
    try {
      const addressList = await this.addressModel.find().exec();
      return new SuccessResult('Success', addressList);
    } catch (error) {
      return new ErrorResult('Error', error.message);
    }
  }

  async getCategoryById(id: string): Promise<BaseResult> {
    try {
      const address = await this.addressModel.findById(id).exec();
      if (!address) {
        return new ErrorResult('There is no address', id);
      }
      return new SuccessResult('Success', address);
    } catch (error) {
      return new ErrorResult('Error occured on getting address by id', error);
    }
  }

  async saveAddress(createAddressDto: CreateAddressDto): Promise<BaseResult> {
    const { name, isActive } = createAddressDto;
    try {
      const savedAddress = new this.addressModel({ name, isActive });
      await savedAddress.save();
      return new SuccessResult(`${name} was created`, savedAddress);
    } catch (error) {
      return new ErrorResult('Error', error.message);
    }
  }

  async deleteAddress(id: string): Promise<BaseResult> {
    try {
      const deletedCategory = await this.addressModel.findByIdAndDelete(id);
      return new SuccessResult(
        `${deletedCategory.name} was deleted`,
        deletedCategory,
      );
    } catch (error) {
      return new ErrorResult('Error', error.message);
    }
  }
  async updateAddress(updateAddressDto: UpdateAddressDto): Promise<BaseResult> {
    const { id, name, isActive } = updateAddressDto;
    try {
      const updatedAddress = await this.addressModel.findById(id).exec();
      if (!updatedAddress) {
        return new ErrorResult(
          `There is no address to update`,
          updateAddressDto,
        );
      }
      const updateFilter = { name: name, isActive: isActive };
      const result = await this.addressModel.findOneAndUpdate(
        { id: id },
        updateFilter,
        { new: true },
      );
      return new SuccessResult(`Success`, result);
    } catch (error) {
      return new ErrorResult('Error', error.message);
    }
  }
}
