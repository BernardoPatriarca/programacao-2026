import { Repository } from "typeorm";
import { Spot } from "./spot.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateSpotDTO } from "./dto/create-spot";
import { UpdateSpotDTO } from "./dto/update-spot";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class SpotService {

    constructor(
        @InjectRepository(Spot) 
        private readonly categoryRepository: Repository<Spot>
    ) {

    }

    findAll(): Promise<Spot[]> {
        return this.categoryRepository.find({
            order: { name: 'ASC' }
        });
    }

    async findOne(id: string): Promise<Spot> {
        const category = await this.categoryRepository.findOneBy({ id });
        
        if (!category) {
            throw new NotFoundException('Mesa não encontrada!');
        }

        return category;
    }

    create(dto: CreateSpotDTO): Promise<Spot> {
        const category = this.categoryRepository.create({ 
            ...dto,
            name: dto.name,
            active: true
         })

         return this.categoryRepository.save(category);
    }

    async update(id: string, dto: UpdateSpotDTO): Promise<Spot> {
        const category = await this.findOne(id);

        if (dto.name !== undefined) {
            category.name = dto.name;
        }

        if (dto.active !== undefined) {
            category.active = dto.active;
        }

        return this.categoryRepository.save(category);
    }

    async remove(id: string): Promise<void> {
        const category = await this.findOne(id);

        await this.categoryRepository.save(category);
    }

}