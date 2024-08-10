import { ArrayMinSize, IsNotEmpty, IsString } from 'class-validator';

export class CreateChatDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ArrayMinSize(2)
  users: number[];
}
