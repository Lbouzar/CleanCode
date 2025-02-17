import { BadRequestException, Injectable } from "@nestjs/common";
import { Order, OrderStatus } from "src/entities/order.entity";
import { OrderRepository } from "src/repositories/order.repository";

@Injectable()
export class OrderService {
    constructor(private readonly orderRepository : OrderRepository){}

    async getAllOrders(): Promise<Order[]>{
        return await this.orderRepository.findAll();
    }

    async getOrderById(id: number): Promise<Order> {
        const order = await this.orderRepository.findOne(id);
        if(!order) throw new BadRequestException("Invalid Order");
        return await order;
        
    }

    async getOrderByStatus(orderStatus : OrderStatus) : Promise<Order[]>{
        if(!Object.values(OrderStatus).includes(orderStatus))
            throw new BadRequestException("Invalid Order Status");
        return await this.orderRepository.findByOrderStatus(orderStatus);
    }

    async getOrderByStockItem(partName : string): Promise<Order[]>{
        if(!partName) throw new BadRequestException("Invalid Stock item");
        return await this.orderRepository.findByPartName(partName)
    }

    async getOrderByUserName(userName : string) : Promise<Order[]>{
        if(!userName) throw new BadRequestException("Invalid User Name");
        return await this.orderRepository.findByUserName(userName)
    }
    async createOrder(order : Order) : Promise<Order>{
        if(!order) throw new BadRequestException("Invalid Order");
        return await this.orderRepository.save(order)
    }

    async deleteOrder(id : number){
        return await this.orderRepository.delete(id)
    }

}