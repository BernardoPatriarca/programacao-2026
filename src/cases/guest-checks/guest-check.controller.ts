import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { GuestCheckService } from "./guest-check.service";
import { GuestCheck } from "./guest-check.entity";
import { CreateGuestCheckDTO } from "./dto/create-guest-check.dto";


@Controller('guest-checks')
export class GuestCheckController {

  constructor(
    private readonly service: GuestCheckService
  ){}

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe)
    id: string
  ) : Promise<GuestCheck> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateGuestCheckDTO): Promise<GuestCheck> {
    return this.service.create(dto);
  }

  @Patch(':id/close')
  close(
    @Param('id', ParseUUIDPipe)
    id: string): Promise<GuestCheck> {
    return this.service.close(id);
  }
}