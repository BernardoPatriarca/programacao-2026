import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, IsUUID, MaxLength, Min } from 'class-validator';

export class CreateProductDTO {
    @IsString()
    @IsNotEmpty()
    @MaxLength(60)
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    price?: number;

    @IsString()
    @IsOptional()
    @IsUUID()
    categoryId?: string;

    @IsOptional()
    @IsBoolean()
    active?: boolean;

    @IsOptional()
    @IsUrl({ require_protocol: true })
    picture?: string;
}