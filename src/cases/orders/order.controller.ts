import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDTO } from "./dto/create-order.dto";
import { UpdateOrderStatusDTO } from "./dto/update-order-status.dto";
import { Order } from "./entities/order.entity";

@Controller('orders')
export class OrderController {

    constructor(
        private readonly orderService: OrderService
    ) { }

    @Post()
    create(@Body() dto: CreateOrderDTO) :Promise<Order> {
        return this.orderService.create(dto);
    }

    @Get()
    findAll() :Promise<Order[]> {
        return this.orderService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) :Promise<Order> {
        return this.orderService.findOne(id);
    }

    @Patch(':id/status')
    updateStatus(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateOrderStatusDTO) :Promise<Order> {
        return this.orderService.updateStatus(id, dto);
    }

}