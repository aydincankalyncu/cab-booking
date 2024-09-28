import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PriceService } from './price.service';
import { BaseResult } from '../utils/result/base-result';
import { CreatePriceDto, UpdatePriceDto } from './dtos';

@Controller('prices')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}
  @Get()
  async getAllPrices(): Promise<BaseResult> {
    return await this.priceService.getAllPrices();
  }
  @Get(':id')
  async getPriceById(@Param('id') id: string): Promise<BaseResult> {
    return await this.priceService.getPriceById(id);
  }
  @Post()
  async createPrice(
    @Body() createPriceDto: CreatePriceDto,
  ): Promise<BaseResult> {
    return await this.priceService.createPrice(createPriceDto);
  }
  @Post('update')
  async updatePrice(
    @Body() updatePriceDto: UpdatePriceDto,
  ): Promise<BaseResult> {
    return await this.priceService.updatePrice(updatePriceDto);
  }
  @Delete(':id')
  async deletePrice(@Param('id') id: string): Promise<BaseResult> {
    return await this.priceService.deletePrice(id);
  }
}
