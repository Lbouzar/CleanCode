import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { OrderStatus } from 'src/entities/order.entity';
import { OrderService } from 'src/services/order.service';

interface CreateOrderRequest {
    userId: number;
    items: { stockId: number; quantity: number }[];
    status: string;
}

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
    @Get('user/:userName')
    async getOrderByUserName(@Param('userName') userName: string){
        return await this.orderService.getOrderByUserName(userName);
    }

    @Post()
    async createOrder(
        @Body() { items }: { items: { stockId: number, quantity: number }[] }
    ) {
        return await this.orderService.createOrder(items);
    }


    @Post('updateStock/:orderId')
    async updateStock(@Param('orderId', ParseIntPipe) orderId: number) {
        return await this.orderService.updateStock(orderId);
    }

    @Get('history')
    async getOrderHistory() {
        return await this.orderService.getOrderHistory();
    }

    @Delete(':id')
    async deleteOrder(@Param('id') id: number){
        return await this.orderService.deleteOrder(id)
    }






}