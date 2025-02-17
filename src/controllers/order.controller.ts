import { BadRequestException, Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Order, OrderStatus } from 'src/entities/order.entity';
import { OrderService } from 'src/services/order.service';

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService){}

    @Get()
    async getAllOrders(){
        return await this.orderService.getAllOrders()
    }

    @Get('id/:id')
    async getOrderById(@Param('id') id: number){
        return await this.orderService.getOrderById(id);
    }

    @Get('orderstatus/:orderStatus')
    async getOrderByStatus(@Param('orderStatus') status: string){
        const orderStatus = status.toUpperCase() as OrderStatus;
        if(!Object.values(OrderStatus).includes(orderStatus))
            throw new BadRequestException("Invalid Order Status");
        return await this.orderService.getOrderByStatus(orderStatus);
    }

    @Get('partname/:partName')
    async getOrderByPartName(@Param('partName') partName: string){
        return await this.orderService.getOrderByStockItem(partName)
    }

    @Get('user/:userName')
    async getOrderByUserName(@Param('userName') userName: string){
        return await this.orderService.getOrderByUserName(userName);
    }

    @Post()
    async createOrder(@Body() order : Order){
        if(order.quantity <= 0) 
            throw new BadRequestException('Invalid Order Quantity')
        return await this.orderService.createOrder(order)
    }

    @Delete(':id')
    async deleteOrder(@Param('id') id: number){
        return await this.orderService.deleteOrder(id)
    }






}