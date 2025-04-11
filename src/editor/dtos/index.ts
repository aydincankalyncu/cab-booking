export class CreateEditorDto {
    image: string;
    content: string;
    editorName: string;
}

export class UpdateEditorDto {
    id: string;
    image: string;
    editorName: string;
    content: string;
}