import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { OrderItem } from "src/entities/orderItem.entity";
import { OrderItemService } from "src/services/orderItem.service";




@Controller('orderItems')
export class OrderItemController {
    constructor(private readonly orderItemService : OrderItemService){}

    @Get()
    async getAllOrderItems(){
        return await this.orderItemService.getAllOrderItems()
    }
    
    @Get(':id')
    async getOrderItemById(@Param('id') id:number){
        return await this.orderItemService.getOrderItemById(id);
    }

    @Post()
    async createOrderItem(@Body() orderItem: OrderItem){
        return await this.orderItemService.createOrderItem(orderItem);
    }

    @Delete(':id')
    async deleteOrderItem(@Param('id') id: number){
        return await this.orderItemService.deleterOrderItem(id);
    }
    
}