import { IsUUID } from "class-validator";

export class CreateGuestCheckDTO {
  @IsUUID()
  spotId: string;
}