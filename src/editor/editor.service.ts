import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Editor } from "../schemas/editor-schema";
import { BaseResult } from "src/utils/result/base-result";
import { Model } from "mongoose";
import { SuccessResult } from "src/utils/result/success-result";
import { ErrorResult } from "src/utils/result/error-result";
import { CreateEditorDto, UpdateEditorDto } from "./dtos";

@Injectable()
export class EditorService {
  constructor(
    @InjectModel(Editor.name) private readonly editorModel: Model<Editor>,
  ) {}

  async getAll(): Promise<BaseResult> {
    try {
      const editorList = await this.editorModel.find().exec();
      return new SuccessResult("Success", editorList);
    } catch (error) {
      return new ErrorResult("Error", error.message);
    }
  }

  async getById(id: string): Promise<BaseResult> {
    try {
      const result = await this.editorModel.findById(id).exec();
      if (!result) {
        return new ErrorResult("There is no editor.", id);
      }
      return new SuccessResult("Success", result);
    } catch (error) {
      return new ErrorResult("Error", error.message);
    }
  }

  async createEditor(
    createEditorDto: CreateEditorDto,
  ): Promise<BaseResult> {
    const { content, editorName, image } = createEditorDto;
    try {
      const savedEditor = new this.editorModel({
        content,
        editorName,
        image
      });

      await savedEditor.save();
      return new SuccessResult("Success", savedEditor);
    } catch (error) {
      return new ErrorResult("Error", error.message);
    }
  }

  async updateEditor(
    updateEditorDto: UpdateEditorDto,
  ): Promise<BaseResult> {
    const { content, id, image, editorName } = updateEditorDto;
    try {
      const editor = await this.editorModel.findById(id).exec();
      if (!editor) {
        return new ErrorResult("There is no editor.", id);
      }

      const updateFiler = {
        content,
        image,
        editorName
      };

      const result = await this.editorModel.findOneAndUpdate(
        {_id: id },
        updateFiler,
        { new: true }
      );

      return new SuccessResult('Success', result);
    } catch (error) {
        return new ErrorResult('Error', error.message);
    }
  }

  async deleteEditor(id: string): Promise<BaseResult> {
    try {
        const result = await this.editorModel.findByIdAndDelete(id);
        return new SuccessResult('Success', result);
    } catch (error) {
        return new ErrorResult('Error', error.message);
    }
  }
}
