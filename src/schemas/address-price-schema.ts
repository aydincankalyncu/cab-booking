import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Address } from './address-schema';
import { Car } from './car-schema';

export type AddressDocument = HydratedDocument<AddressPrice>;

@Schema({ timestamps: true })
export class AddressPrice {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Address', required: true })
  from: Address;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Address', required: true })
  to: Address;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Car', required: true })
  car: Car;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  roundTripPrice: number;
  @Prop({ required: true })
  travelTime: number;
  @Prop({ required: true })
  distance: number;
}

export const AddressPriceSchema = SchemaFactory.createForClass(AddressPrice);
