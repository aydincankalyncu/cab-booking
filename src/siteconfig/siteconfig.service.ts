import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SiteConfig } from "src/schemas/siteconfig-schema";
import { BaseResult } from "src/utils/result/base-result";
import { ErrorResult } from "src/utils/result/error-result";
import { SuccessResult } from "src/utils/result/success-result";
import { CreateSiteConfigDto, UpdateSiteConfigDto } from "./dtos";

@Injectable()
export class SiteconfigService {
  constructor(
    @InjectModel(SiteConfig.name)
    private readonly siteConfigModel: Model<SiteConfig>,
  ) {}

  async getAll(): Promise<BaseResult> {
    try {
      const result = await this.siteConfigModel.find().exec();
      return new SuccessResult("Success", result);
    } catch (error) {
      return new ErrorResult("Error", error.message);
    }
  }

  async create(createSiteConfigDto: CreateSiteConfigDto): Promise<BaseResult> {
    try {
      const createdSiteConfig = new this.siteConfigModel({
        ...createSiteConfigDto,
      });

      await createdSiteConfig.save();

      return new SuccessResult("Success", createdSiteConfig);
    } catch (error) {
      return new ErrorResult("Error", error.message);
    }
  }

  async update(updateSiteConfigDto: UpdateSiteConfigDto): Promise<BaseResult> {
    const {
      id,
      phoneNumber,
      address,
      contactEmail,
      youtubeUrl,
      instagramUrl,
      facebookUrl,
      twitterUrl,
    } = updateSiteConfigDto;
    try {
      const car = await this.siteConfigModel.findById(id).exec();

      if (!car) {
        return new ErrorResult(
          "Error, there is no site config with this id.",
          id,
        );
      }

      const updateFilter = {
        phoneNumber,
        address,
        contactEmail,
        youtubeUrl,
        instagramUrl,
        facebookUrl,
        twitterUrl,
      };

      const result = await this.siteConfigModel.findOneAndUpdate(
        { _id: id },
        updateFilter,
        { new: true },
      );

      return new SuccessResult("Success", result);
    } catch (error) {
      return new ErrorResult("Error", error.message);
    }
  }
}
