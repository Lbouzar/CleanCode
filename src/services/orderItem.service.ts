import { BadRequestException, Injectable } from "@nestjs/common";
import { OrderItem } from "src/entities/orderItem.entity";
import { OrderItemRepository } from "src/repositories/orderItem.repository";

@Injectable()
export class OrderItemService {
    constructor
    (private readonly orderItemRepository : OrderItemRepository){}

    async getAllOrderItems(): Promise<OrderItem[]>{
        return await this.orderItemRepository.findAll();
    }

    async getOrderItemById(id : number) : Promise<OrderItem> {
        const orderItem = await this.orderItemRepository.findOne(id);
        if(!orderItem) throw new BadRequestException("Invalid item");
        return await orderItem;
    }

    async createOrderItem(orderItem : OrderItem) : Promise<OrderItem>{
        if(!orderItem) throw new BadRequestException("Invalid Item");
        return await this.orderItemRepository.save(orderItem);
    
    }

    async deleterOrderItem(id: number){
        return await this.orderItemRepository.delete(id);
    }
    


}