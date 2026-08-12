import { Repository } from "typeorm";
import { Category } from "./category.entity";

export class CategoryService {

    @Inject(Category)
    constructor(private readonly categoryRepository: Repository<Category>) {

    }

    findAll(): Promise<Category[]> {
        return this.categoryRepository.find();
    }

    findOne(): Promise<Category> {

    }

    create(): Promise<Category> {

    }

    update(): Promise<Category> {

    }

    remove(): Promise<void> {

    }

}