import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AddressService } from './address.service';
import { BaseResult } from '../utils/result/base-result';
import { CreateAddressDto, UpdateAddressDto } from './dtos';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
  @Get()
  async getAddressList(): Promise<BaseResult> {
    return await this.addressService.getAddresses();
  }
  @Get(':id')
  async getAddressById(@Param('id') id: string): Promise<BaseResult> {
    return await this.addressService.getAddressById(id);
  }
  @Post()
  async createAddress(
    @Body() createAddressDto: CreateAddressDto,
  ): Promise<BaseResult> {
    return await this.addressService.saveAddress(createAddressDto);
  }
  @Delete(':id')
  async deleteAddress(@Param('id') id: string): Promise<BaseResult> {
    return await this.addressService.deleteAddress(id);
  }
  @Post('update')
  async updateAddress(
    @Body() updateAddressDto: UpdateAddressDto,
  ): Promise<BaseResult> {
    return await this.addressService.updateAddress(updateAddressDto);
  }
}
