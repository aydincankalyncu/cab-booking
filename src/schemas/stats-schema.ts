import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type StatsDocument = HydratedDocument<Stats>;

@Schema({ timestamps: true })
export class Stats {
    @Prop()
    countryCode: string;

    @Prop()
    country: string;
    
    @Prop()
    timeZone: string;

    @Prop()
    query: string;

}

export const StatsSchema = SchemaFactory.createForClass(Stats);