import { Module } from '@nestjs/common';
import { EditorController } from './editor.controller';
import { EditorService } from './editor.service';
import { EditorSchema } from 'src/schemas/editor-schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Editor', schema: EditorSchema }])],
  controllers: [EditorController],
  providers: [EditorService]
})
export class EditorModule {}
