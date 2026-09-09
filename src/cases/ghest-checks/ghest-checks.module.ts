import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GhestCheck } from "./ghest-checks.entity";
import { GhestCheckController } from "./ghest-checks.controller";
import { GhestCheckService } from "./ghest-checks.service";

@Module({
    imports: [TypeOrmModule.forFeature([GhestCheck])],
    controllers: [GhestCheckController],
    providers: [GhestCheckService]
})
export class GhestCheckModule {

}