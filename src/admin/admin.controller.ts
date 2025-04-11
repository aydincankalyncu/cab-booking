import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ForwardReservationModel } from './dtos';
import { BaseResult } from 'src/utils/result/base-result';

@Controller('admin')
export class AdminController {

    constructor(private readonly adminService: AdminService) {}

    @Post('forward')
    async forwardReservation(@Body() forwardReservationModel: ForwardReservationModel) : Promise<BaseResult> {
        return await this.adminService.forwardMail(forwardReservationModel);
    }
}
