import { IsNotEmpty, IsString } from "class-validator";

export class CreateMessageDto {
    chat: number;
    author: number;
    @IsNotEmpty()
    @IsString()
    text: string;
}
