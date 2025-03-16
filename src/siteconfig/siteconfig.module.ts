import { Module } from "@nestjs/common";
import { SiteconfigService } from "./siteconfig.service";
import { SiteconfigController } from "./siteconfig.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { SiteConfigSchema } from "src/schemas/siteconfig-schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "SiteConfig", schema: SiteConfigSchema },
    ]),
  ],
  providers: [SiteconfigService],
  controllers: [SiteconfigController],
})
export class SiteconfigModule {}
