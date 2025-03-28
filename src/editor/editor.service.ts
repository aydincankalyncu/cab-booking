import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Editor } from "../schemas/editor-schema";
import { BaseResult } from "src/utils/result/base-result";
import { Model } from "mongoose";
import { SuccessResult } from "src/utils/result/success-result";
import { ErrorResult } from "src/utils/result/error-result";
import { CreateEditorDto, UpdateEditorDto } from "./dtos";
import { join } from "path";
import * as fs from "fs";

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
    file: Express.Multer.File,
    createEditorDto: CreateEditorDto,
  ): Promise<BaseResult> {
    const { content } = createEditorDto;
    try {
      let image = "";
      if (file) {
        const imagePath = `uploads/editors/${file.originalname}`;
        image = imagePath;
        await this.saveImage(file, imagePath);
      }

      const savedEditor = new this.editorModel({
        content,
        fileName: image,
      });

      await savedEditor.save();
      return new SuccessResult("Success", savedEditor);
    } catch (error) {
      return new ErrorResult("Error", error.message);
    }
  }

  async updateEditor(
    file: Express.Multer.File,
    updateEditorDto: UpdateEditorDto,
  ): Promise<BaseResult> {
    const { content, id } = updateEditorDto;
    try {
      const editor = await this.editorModel.findById(id).exec();
      if (!editor) {
        return new ErrorResult("There is no editor.", id);
      }

      let image = editor.fileName;
      if (file) {
        await this.deleteFile(image);
        const imagePath = `uploads/editors/${file.originalname}`;
        image = imagePath;
        await this.saveImage(file, imagePath);
      }

      const updateFiler = {
        content: content,
        fileName: image
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
        if (result.fileName)
        {
            await this.deleteFile(result.fileName);
        }
        return new SuccessResult('Success', result);
    } catch (error) {
        return new ErrorResult('Error', error.message);
    }
  }

  private async saveImage(
    file: Express.Multer.File,
    imagePath: string,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(imagePath, file.buffer, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  async deleteFile(image: string): Promise<void> {
    const filePath = join(__dirname, "..", "..", "uploads", "editors", image);
    try {
      await fs.promises.unlink(filePath); // Delete file.
      console.log("File deleted:", filePath);
    } catch (error) {
      if (error.code === "ENOENT") {
        // If there is no file
        console.log("File not found, so not deleted:", filePath);
      } else {
        console.error("Error while deleting file:", error);
      }
    }
  }
}
