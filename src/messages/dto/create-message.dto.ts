import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateMessageDto {
  @IsNumber()
  @Min(1)
  chat: number;

  @IsNumber()
  @Min(1)
  author: number;

  @IsNotEmpty()
  @IsString()
  text: string;
}
