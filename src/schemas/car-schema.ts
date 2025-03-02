import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CarDocument = HydratedDocument<Car>;

@Schema({ timestamps: true })
export class Car {
  @Prop({ required: true })
  name: string;
  @Prop({ default: true })
  isActive: boolean;
  @Prop({ required: true })
  capacity: number;
  @Prop({ required: true })
  luggage: number;
  @Prop({ required: true })
  image: string;
  @Prop({ required: true })
  description: string;
}

export const CarSchema = SchemaFactory.createForClass(Car);
