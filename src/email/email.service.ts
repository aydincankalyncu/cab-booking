import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { CreateReservationDto } from 'src/reservation/dtos';
import { BaseResult } from 'src/utils/result/base-result';

@Injectable()
export class EmailService {
    private transporter;
    constructor(private configService: ConfigService) {
        console.log(this.configService.get('MAIL_HOST'));
        console.log(this.configService.get('MAIL_PORT'));
        console.log(this.configService.get('MAIL_SECURE'));
        console.log(this.configService.get('MAIL_USER'));
        console.log(this.configService.get('MAIL_PASSWORD'));
        console.log(this.configService.get('MAIL_FROM'));
        this.transporter = nodemailer.createTransport({
            host: this.configService.get('MAIL_HOST'),
            port: this.configService.get('MAIL_PORT'),
            secure: this.configService.get('MAIL_SECURE') === 'true',
            auth: {
                user: this.configService.get('MAIL_USER'),
                pass: this.configService.get('MAIL_PASSWORD')
            },
        });
    }

    async sendReservationConfirmation(reservation: CreateReservationDto) : Promise<boolean> {
        try {
            const mailOptions = {
                from: this.configService.get('MAIL_FROM'),
                to: reservation.email,
                subject: 'Reservation Confirmation',
                html: this.getReservationConfirmationTemplate(reservation),
            };

            

            console.log(mailOptions);

            await this.transporter.sendMail(mailOptions);

            return true;
        } catch (error) {
            console.log('Email sending failed: ', error);
            return false;
        }
    }

    private getReservationConfirmationTemplate(reservation: CreateReservationDto): string {
        return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee;">
          <h2>Reservation Confirmation</h2>
          <p>Dear ${reservation.name},</p>
          <p>Thank you for your reservation. Below are your reservation details:</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p><strong>Hotel:</strong> ${reservation.hotelName || 'N/A'}</p>
            <p><strong>Address:</strong> ${reservation.address || 'N/A'}</p>
            <p><strong>Pickup Date:</strong> ${reservation.pickupDate}</p>
            <p><strong>Luggage Details:</strong> ${reservation.luggageDetails}</p>
            <p><strong>Transfer Type:</strong> ${reservation.transferType}</p>
            <p><strong>Passenger Count:</strong> ${reservation.passengerCount}</p>
            <p><strong>Payment Method:</strong> ${reservation.paymentType}</p>
          </div>
          
          <p>If you have any questions or need to make changes to your reservation, please contact us.</p>
          <p>Thank you for choosing our service!</p>
        </div>
      `;
    }
}
