import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AddressDocument = HydratedDocument<Address>;

@Schema({ timestamps: true })
export class Address {
  @Prop({ required: true })
  name: string;
  @Prop({ default: true })
  isActive: boolean;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
