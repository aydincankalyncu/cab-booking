import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type SiteConfigDocument = HydratedDocument<SiteConfig>;

@Schema({ timestamps: true })
export class SiteConfig {

    @Prop()
    phoneNumber: string;

    @Prop()
    address: string;

    @Prop()
    contactEmail: string;

    @Prop()
    youtubeUrl: string;

    @Prop()
    instagramUrl: string;

    @Prop()
    facebookUrl: string;

    @Prop()
    twitterUrl: string;

    @Prop()
    mailHost: string;

    @Prop()
    mailPort: string;

    @Prop()
    mailFrom: string;

}

export const SiteConfigSchema = SchemaFactory.createForClass(SiteConfig);
