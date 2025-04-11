import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ReservationDocument = HydratedDocument<Reservation>;

@Schema({ timestamps: true })
export class Reservation {
  @Prop()
  hotelName: string;
  @Prop()
  address: string;
  @Prop()
  pickUpDate: string;
  @Prop()
  transferTime: string;
  @Prop()
  luggageDetails: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  phoneNumber: string;
  @Prop()
  transferType: string;
  @Prop()
  paymentType: string;
  @Prop({ required: true })
  passengerCount: number;
  @Prop()
  isDeleted: boolean;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
