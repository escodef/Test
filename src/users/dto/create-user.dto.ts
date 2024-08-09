import { IsString, Length } from "class-validator";

export class CreateUserDto {
    @IsString()
    @Length(5, 10)
    username: string;
}
