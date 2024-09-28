import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ResortDocument = HydratedDocument<Resort>;

@Schema({ timestamps: true })
export class Resort {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  isActive: boolean;
  @Prop({ required: true })
  from: string;
  @Prop({ required: true })
  to: string;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  roundTripPrice: number;
  @Prop({ required: true })
  distance: number;
  @Prop({ required: true })
  image: string;
  @Prop({ required: true })
  car: string;
}

export const ResortSchema = SchemaFactory.createForClass(Resort);
