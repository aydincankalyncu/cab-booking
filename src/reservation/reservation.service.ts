import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation } from 'src/schemas/reservation-schema';
import { BaseResult } from 'src/utils/result/base-result';
import { ErrorResult } from 'src/utils/result/error-result';
import { SuccessResult } from 'src/utils/result/success-result';
import { CreateReservationDto } from './dtos';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class ReservationService {
    constructor(
        @InjectModel(Reservation.name)
        private readonly reservationModel: Model<Reservation>,
        private readonly emailService: EmailService,
    ) {}

    async getAllReservations(): Promise<BaseResult> {
        try {
            const result = await this.reservationModel.find().where({isDeleted: false}).exec();
            return new SuccessResult('Success', result);
        } catch (error) {
            return new ErrorResult('Error', error.message);
        }
    }

    async deleteReservation(id: string): Promise<BaseResult> {
        try {
            const updatedReservation = await this.reservationModel.findByIdAndUpdate(
                id,
                { isDeleted: true },
                { new: true }
            );
            
            if (!updatedReservation) {
                return new ErrorResult('Error', 'Reservation not found');
            }
            
            return new SuccessResult('Reservation deleted successfully', updatedReservation);
        } catch (error) {
            return new ErrorResult('Error', error.message);
        }
    }

    async createReservation(createReservationDto: CreateReservationDto) : Promise<BaseResult> {
        try {
            const newReservation = new this.reservationModel({
                ...createReservationDto,
                pickUpDate: createReservationDto.pickupDate,
                isDeleted: false
            });

            await newReservation.save();

            const emailSent = await this.emailService.sendReservationConfirmation(createReservationDto);

            if (!emailSent)
            {
                console.warn('Confirmation email could not be sent to: ', createReservationDto.email);
            }

            return new SuccessResult('Success', newReservation);
        } catch (error) {
            return new ErrorResult('Error', error.message);
        }
    }

    async getTotalCountOfReservations() {
        try {
            const count = await this.reservationModel.countDocuments({ isDeleted: false });
            return new SuccessResult('Success', count)
        } catch (error) {
            return new ErrorResult('Error', error.message);
        }
    }
}
