import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsInt, IsPositive, IsUUID, ValidateNested } from "class-validator";

export class CreateOrderItemDTO {
  @IsUUID()
  productId: string;

  @IsInt()
  @IsPositive()
  quantity: number;  
}

export class CreateOrderDTO {
  @IsUUID()
  spotId: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({each: true})
  @Type(() => CreateOrderItemDTO)
  items: CreateOrderItemDTO[];
}