import { Repository } from "typeorm";
import { GhestCheck, GhestCheckStatus } from "./ghest-checks.entity";
import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateGhestCheckDTO } from "./dto/create-ghest-checks-dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Spot } from "../spots/spot.entity";

@Injectable()
export class GhestCheckService {

    constructor(
        @InjectRepository(GhestCheck) 
        private readonly ghestCheckRepository: Repository<GhestCheck>,

        @InjectRepository(Spot) 
        private readonly spotRepository: Repository<Spot>,
    ) {

    }

    async findOne(id: string): Promise<GhestCheck> {
        const ghestCheck = await this.ghestCheckRepository.findOneBy({ id });
        
        if (!ghestCheck) {
            throw new NotFoundException('Comanda não encontrada!');
        }

        return ghestCheck;
    }

    async create(dto: CreateGhestCheckDTO): Promise<GhestCheck> {
        const spot = await this.spotRepository.findOneBy({ id: dto.spotId, active: true });

        if (!spot) {
            throw new NotFoundException('Mesa não encontrada!');
        }

        const opened = await this.ghestCheckRepository.exists({ 
            where: { 
                spot: { id: dto.spotId }, 
                status: GhestCheckStatus.OPENED
            } 
        });

        if (opened) {
            throw new ConflictException('Mesa possui comanda aberta!');
        }

        const ghestCheck = this.ghestCheckRepository.create({
            spot,
            status: GhestCheckStatus.OPENED
        });

        return this.ghestCheckRepository.save(ghestCheck);
    }

    async close(id: string): Promise<GhestCheck> {
        const ghestCheck = await this.findOne(id);
        
        if (ghestCheck.status !== GhestCheckStatus.OPENED) {
            throw new BadRequestException('Comanda não está aberta!');
        }

//        if (ghestCheck.status !== GhestCheckStatus.OPENED) {
//            throw new BadRequestException('Comanda não está aberta!');
//        }

        ghestCheck.status = GhestCheckStatus.CLOSED;

        return this.ghestCheckRepository.save(ghestCheck);
    }

}