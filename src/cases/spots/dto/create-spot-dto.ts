import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateSpotDTO {
    @IsString()
    @IsNotEmpty()
    @MaxLength(60)
    name: string;
}