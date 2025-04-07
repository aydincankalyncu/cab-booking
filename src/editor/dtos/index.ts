export class CreateEditorDto {
    content: string;
    editorName: string;
}

export class UpdateEditorDto {
    id: string;
    editorName: string;
    content: string;
}