import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { ForwardReservationModel } from './dtos';
import { BaseResult } from 'src/utils/result/base-result';
import { ErrorResult } from 'src/utils/result/error-result';
import { SuccessResult } from 'src/utils/result/success-result';

@Injectable()
export class AdminService {

    constructor(private readonly emailService: EmailService) {}

    async forwardMail(forwardReservationModel: ForwardReservationModel) : Promise<BaseResult> {
        try {
            var result = await this.emailService.forwardReservation(forwardReservationModel);
            return new SuccessResult('Success', result);
        } catch (error) {
            return new ErrorResult("Error occured", error);
        }
    }
}
