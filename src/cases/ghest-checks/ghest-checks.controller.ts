import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { GhestCheckService } from "./ghest-checks.service";
import { GhestCheck } from "./ghest-checks.entity";
import { CreateGhestCheckDTO } from "./dto/create-ghest-checks-dto";

@Controller('categories')
export class GhestCheckController {

    constructor(
        private readonly service: GhestCheckService
    ) { }

    @Get()
    findAll(): Promise<GhestCheck[]> {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string): Promise<GhestCheck> {
        return this.service.findOne(id);
    }

    @Post()
    create(@Body() dto: CreateGhestCheckDTO): Promise<GhestCheck> {
        return this.service.create(dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        return this.service.remove(id);
    }

}