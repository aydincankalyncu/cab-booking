import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { EditorService } from "./editor.service";
import { BaseResult } from "src/utils/result/base-result";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateEditorDto, UpdateEditorDto } from "./dtos";

@Controller("editor")
export class EditorController {
  constructor(private readonly editorService: EditorService) {}

  @Get()
  async getAll(): Promise<BaseResult> {
    return await this.editorService.getAll();
  }

  @Get(":id")
  async getCar(@Param("id") id: string): Promise<BaseResult> {
    return await this.editorService.getById(id);
  }
  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async createCar(
    @Body() createEditorDto: CreateEditorDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<BaseResult> {
    return await this.editorService.createEditor(file, createEditorDto);
  }
  @Post("update")
  @UseInterceptors(
    FileInterceptor("file", {
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        if (!file) {
          cb(null, false);
        } else {
          cb(null, true);
        }
      },
    }),
  )
  async updateCar(
    @Body() updateEditorDto: UpdateEditorDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<BaseResult> {
    return await this.editorService.updateEditor(file, updateEditorDto);
  }
  @Delete(":id")
  async deleteCar(@Param("id") id: string): Promise<BaseResult> {
    return await this.editorService.deleteEditor(id);
  }
}
