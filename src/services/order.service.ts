import { BadRequestException, Injectable } from "@nestjs/common";
import { Order, OrderStatus } from "src/entities/order.entity";
import { OrderItem } from "src/entities/orderItem.entity";
import { Stock } from "src/entities/stock.entity";
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
    async createOrder(order : Order) : Promise<Order>{
        //A arranger.
        if(!order || order.user.role !== "Admin") throw new BadRequestException("Invalid Order");
        return await this.orderRepository.save(order)
    }

    async updateStock(status: string, stock : Stock, orderItem: OrderItem){
        const orderStatus = status.toUpperCase() as OrderStatus;
        if(!Object.values(OrderStatus).includes(orderStatus))
            throw new BadRequestException("Invalid Order Status");
        return await this.orderRepository.updateStock(orderStatus,stock,orderItem)
        
    }

    async deleteOrder(id : number){
        return await this.orderRepository.delete(id)
    }

}