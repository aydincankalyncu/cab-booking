import { Body, Controller, Get, Post } from "@nestjs/common";
import { SiteconfigService } from "./siteconfig.service";
import { BaseResult } from "src/utils/result/base-result";
import { CreateSiteConfigDto, UpdateSiteConfigDto } from "./dtos";

@Controller("siteconfig")
export class SiteconfigController {
  constructor(private readonly siteConfigService: SiteconfigService) {}

  @Get()
  async getSiteConfig(): Promise<BaseResult> {
    return await this.siteConfigService.getAll();
  }

  @Post()
  async create(
    @Body() createSiteConfigDto: CreateSiteConfigDto,
  ): Promise<BaseResult> {
    return await this.siteConfigService.create(createSiteConfigDto);
  }

  @Post("update")
  async update(
    @Body() updateSiteConfigDto: UpdateSiteConfigDto,
  ): Promise<BaseResult> {
    return await this.siteConfigService.update(updateSiteConfigDto);
  }
}
