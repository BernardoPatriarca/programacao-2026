import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { Order } from "./entities/order.entity";
import { OrderItem } from "./entities/order-item.entity";
import { ProductModule } from "../products/product.module";
import { GuestCheckModule } from "../guest-checks/guest-check.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Order, OrderItem]),
        ProductModule,
        GuestCheckModule
    ],
    controllers: [OrderController],
    providers: [OrderService]
})
export class OrderModule {

}