import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { BaseResult } from 'src/utils/result/base-result';
import { CreateReservationDto } from './dtos';

@Controller('reservation')
export class ReservationController {
    constructor(private readonly reservationService: ReservationService) {}

    @Get()
    async getReservations(): Promise<BaseResult> {
        return await this.reservationService.getAllReservations();
    }

    @Delete(':id')
    async deleteReservation(@Param('id') id: string) : Promise<BaseResult> {
        return await this.reservationService.deleteReservation(id);
    }

    @Post()
    async createReservation(
        @Body() createReservationDto: CreateReservationDto
    ): Promise<BaseResult> {
        return await this.reservationService.createReservation(createReservationDto);
    }

    @Get("count")
    async countOfReservations(): Promise<BaseResult> {
        return await this.reservationService.getTotalCountOfReservations();
    }
}
