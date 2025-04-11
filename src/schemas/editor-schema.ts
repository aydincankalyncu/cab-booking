import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type EditorDocument = HydratedDocument<Editor>;

@Schema({timestamps: true})
export class Editor {
    @Prop({required: true})
    image: string;
    @Prop({required: true})
    editorName: string;
    @Prop({required: true})
    content: string;
}

export const EditorSchema = SchemaFactory.createForClass(Editor);