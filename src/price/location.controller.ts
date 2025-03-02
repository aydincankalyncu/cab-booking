import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LocationService } from './location.service';
import { BaseResult } from '../utils/result/base-result';
import { CreateLocationDto, UpdateLocationDto } from './dtos';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}
  @Get()
  async getAllLocations(): Promise<BaseResult> {
    return await this.locationService.getAllLocations();
  }
  @Get(':id')
  async getLocationyId(@Param('id') id: string): Promise<BaseResult> {
    return await this.locationService.getLocationById(id);
  }
  @Post()
  async createLocation(
    @Body() createPriceDto: CreateLocationDto,
  ): Promise<BaseResult> {
    return await this.locationService.createLocation(createPriceDto);
  }
  @Post('update')
  async updateLocation(
    @Body() updatePriceDto: UpdateLocationDto,
  ): Promise<BaseResult> {
    return await this.locationService.updateLocation(updatePriceDto);
  }
  @Delete(':id')
  async deleteLocation(@Param('id') id: string): Promise<BaseResult> {
    return await this.locationService.deleteLocation(id);
  }
}
