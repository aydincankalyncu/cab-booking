import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ResortDocument = HydratedDocument<Resort>;

@Schema()
export class CarPricing {
  @Prop({ required: true })
  carId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  priceOneWay: number;

  @Prop({ required: true })
  priceOneWayDiscount: number;

  @Prop({ required: true })
  priceDoubleWay: number;

  @Prop({ required: true })
  priceDoubleWayDiscount: number;
}

@Schema({ timestamps: true })
export class Resort {
  @Prop({ required: true })
  startingPoint: string;

  @Prop({ required: true })
  destination: string;

  @Prop()
  liveCamUrl: string;
  
  @Prop()
  description: string;

  @Prop({ required: true })
  duration: string;

  @Prop({ required: true })
  distance: number;

  @Prop({ required: true })
  image: string;

  @Prop()
  isActive: boolean;

  @Prop({required: true})
  name: string;

  @Prop({ type: [CarPricing], required: true })
  cars: CarPricing[];
}

export const ResortSchema = SchemaFactory.createForClass(Resort);