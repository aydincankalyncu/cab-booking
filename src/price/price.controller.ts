import { Controller, Get } from '@nestjs/common';
import { PriceService } from './price.service';
import { BaseResult } from '../utils/result/base-result';

@Controller('prices')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}
  @Get()
  async getAllPrices(): Promise<BaseResult> {
    return await this.priceService.getAllPrices();
  }
}
