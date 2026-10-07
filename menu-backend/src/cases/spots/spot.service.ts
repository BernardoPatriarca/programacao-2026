import { Repository } from "typeorm";
import { Spot } from "./spot.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateSpotDTO } from "./dto/create-spot.dto";
import { UpdateSpotDTO } from "./dto/update-spot.dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class SpotService {

    constructor(
        @InjectRepository(Spot) 
        private readonly spotRepository: Repository<Spot>
    ) {

    }

    findAll(): Promise<Spot[]> {
        return this.spotRepository.find({
            order: { name: 'ASC' }
        });
    }

    async findOne(id: string): Promise<Spot> {
        const spot = await this.spotRepository.findOneBy({ id });
        
        if (!spot) {
            throw new NotFoundException('Mesa não encontrada.');
        }

        return spot;
    }

    create(dto: CreateSpotDTO): Promise<Spot> {
        const spot = this.spotRepository.create({ 
            ...dto,
            name: dto.name,
            active: true
         })

         return this.spotRepository.save(spot);
    }

    async update(id: string, dto: UpdateSpotDTO): Promise<Spot> {
        const spot = await this.findOne(id);

        if (dto.name !== undefined) {
            spot.name = dto.name;
        }

        if (dto.active !== undefined) {
            spot.active = dto.active;
        }

        return this.spotRepository.save(spot);
    }

    async remove(id: string): Promise<void> {
        const spot = await this.findOne(id);

        await this.spotRepository.save(spot);
    }

}