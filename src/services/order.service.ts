import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Order, OrderStatus } from "src/entities/order.entity";
import { OrderItem } from "src/entities/orderItem.entity";
import { Stock } from "src/entities/stock.entity";
import { OrderRepository } from "src/repositories/order.repository";
import { OrderItemRepository } from "src/repositories/orderItem.repository";
import { StockRepository } from "src/repositories/stock.repository";
import { StockService } from "./stock.service";
@Injectable()
export class OrderService {
    
    constructor(private readonly orderRepository : OrderRepository,
                private readonly stockRepository: StockRepository,
                private readonly orderItemRepository: OrderItemRepository,
                private readonly stockService: StockService,
    ){}

    async getAllOrders(): Promise<Order[]>{
        return await this.orderRepository.findAll();
    }

    async getOrderById(id: number): Promise<Order> {
        const order = await this.orderRepository.findOne(id);
        if(!order) throw new BadRequestException("Invalid Order");
        return await order;
        
    }

    async getOrderByStatus(status : string) : Promise<Order[]>{
        const orderStatus = status.toUpperCase() as OrderStatus;
        if(!Object.values(OrderStatus).includes(orderStatus))
            throw new BadRequestException("Invalid Order Status");
        return await this.orderRepository.findByOrderStatus(orderStatus);
    }

    async getOrderByUserName(userName : string) : Promise<Order[]>{
        if(!userName) throw new BadRequestException("Invalid User Name");
        return await this.orderRepository.findByUserName(userName)
    }

    async createOrder(items: { stockId: number, quantity: number }[]) {
        if (!items || items.length === 0) {
            throw new BadRequestException("Order must contain at least one item.");
        }

        // Create a new order
        const order = new Order();
        order.status = OrderStatus.PENDING;
        order.items = [];

        // Save the order first to generate its ID
        await this.orderRepository.save(order);

        // Process each stock item in the order
        for (const item of items) {
            const orderItem = new OrderItem();
            orderItem.order = order;
            orderItem.stock = { id: item.stockId } as Stock; // Ensure stock is assigned correctly
            orderItem.quantity = item.quantity;

            await this.orderItemRepository.save(orderItem);
            order.items.push(orderItem);
        }

        return this.orderRepository.findOne(order.id);
    
        }
    async updateStock(orderId: number) {
            const order = await this.orderRepository.findOne(orderId );
    
            if (!order) throw new NotFoundException('Order not found');
            if (order.status !== OrderStatus.RECEIVED) throw new BadRequestException('Order must be received to update stock');
    
            for (const item of order.items) {
                await this.stockService.increaseStock(item.stock.id, item.quantity);
            }
    
            order.status = OrderStatus.RECEIVED;
            return await this.orderRepository.save(order);
        }

    async getOrderHistory() {
            return await this.orderRepository.findAll()
        }
    

     async deleteOrder(id : number){
        return await this.orderRepository.delete(id)
    }

}