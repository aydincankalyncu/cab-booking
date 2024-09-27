import { Module } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceController } from './price.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressPriceSchema } from '../schemas/address-price-schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'AddressPrice', schema: AddressPriceSchema },
    ]),
  ],
  providers: [PriceService],
  controllers: [PriceController],
})
export class PriceModule {}
