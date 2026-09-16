import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateOrderDTO, CreateOrderItemDTO } from "./dto/create-order.dto";
import { UpdateOrderStatusDTO } from "./dto/update-order-status.dto";
import { Order, OrderStatus } from "./entities/order.entity";
import { OrderItem } from "./entities/order-item.entity";
import { GuestCheckService } from "../guest-checks/guest-check.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductService } from "../products/product.service";

@Injectable()
export class OrderService {
  constructor(
    private readonly guestCheckService: GuestCheckService,
    private readonly productService: ProductService,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>    
  ){}

  private async prepareItems(dto: CreateOrderItemDTO): Promise<OrderItem> {
    const product = await this.productService.findOne(dto.productId);
    const price = Number(product.price);
    const subtotal = dto.quantity * price;

    return this.orderItemRepository.create({
      product,
      quantity: dto.quantity,
      price,
      subtotal
    });
  }

  async create(dto: CreateOrderDTO): Promise<Order> {
    // Regra #1: Verificar se tem comanda aberta para a mesa
    const guestCheck = await this.guestCheckService.findOrCreateOpened(dto.spotId);

    // Monta o totalizador do pedido
    const items: OrderItem[] = [];
    let total = 0;

    for (const itemDto of dto.items) {
      const item = await this.prepareItems(itemDto); // Prepara para inserir no banco
      items.push(item);
      total += Number(item.subtotal)
    }

    // Monta o pedido
    const order = this.orderRepository.create({
      guestCheck,
      status: OrderStatus.NEW,
      total,
      items
    })

    // Gravar no banco o pedido
    return this.orderRepository.save(order);    
  }

  async findOne(id: string): Promise<Order> {
      const order = await this.orderRepository.findOneBy({ id });

      if (!order) {
          throw new NotFoundException('Comanda não encontrada.');
      }

      return order;
  }

  async findAll(): Promise<Order[]> {
      const order = await this.orderRepository.find();

      if (!order) {
          throw new NotFoundException('Comanda não encontrada.');
      }

      return order;
  }


  async updateStatus(id: string, dto: UpdateOrderStatusDTO): Promise<Order> {
    const order = await this.findOne(id);

    // Determina a sequência obrigatória de mudanças de status
    const nextStatus: Record<OrderStatus, OrderStatus | undefined> = {
      [OrderStatus.NEW]: OrderStatus.PREPARING,
      [OrderStatus.PREPARING]: OrderStatus.READY,
      [OrderStatus.READY]: OrderStatus.DELIVERY,
      [OrderStatus.DELIVERY]: undefined,
    };

    // Verifica se o client está enviando um status válido para a mudança
    const expected = nextStatus[order.status];

    if (dto.status !== expected) {
      throw new BadRequestException('Status inválido.');
    }

    // Força a mudança de status para o próximo status esperado
    order.status = dto.status;

    // Grava no banco o pedido atualizado
    return this.orderRepository.save(order);
  }

}