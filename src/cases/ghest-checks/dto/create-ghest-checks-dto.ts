import { IsUUID } from "class-validator";

export class CreateGhestCheckDTO {
    @IsUUID()
    spotId: string;
}