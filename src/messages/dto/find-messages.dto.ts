import { IsNumber, Min } from 'class-validator';

export class FindMessagesDto {
  @IsNumber()
  @Min(1)
  chat: number;
}
