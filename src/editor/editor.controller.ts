import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { EditorService } from "./editor.service";
import { BaseResult } from "src/utils/result/base-result";
import { CreateEditorDto, UpdateEditorDto } from "./dtos";

@Controller("editors")
export class EditorController {
  constructor(private readonly editorService: EditorService) {}

  @Get()
  async getAll(): Promise<BaseResult> {
    return await this.editorService.getAll();
  }

  @Get(":id")
  async getEditor(@Param("id") id: string): Promise<BaseResult> {
    return await this.editorService.getById(id);
  }
  @Post()
  async createEditor(
    @Body() createEditorDto: CreateEditorDto
  ): Promise<BaseResult> {
    return await this.editorService.createEditor(createEditorDto);
  }
  @Post("update")
  async updateEditor(
    @Body() updateEditorDto: UpdateEditorDto,
  ): Promise<BaseResult> {
    return await this.editorService.updateEditor(updateEditorDto);
  }
  @Delete(":id")
  async deleteEditor(@Param("id") id: string): Promise<BaseResult> {
    return await this.editorService.deleteEditor(id);
  }
}
