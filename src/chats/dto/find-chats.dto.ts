import { IsNumber, Min } from 'class-validator';
import { IsNull } from 'typeorm';

export class FindChatsDto {
  @IsNumber()
  @Min(1)
  user: number;
}
