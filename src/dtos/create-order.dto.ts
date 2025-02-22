import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { OrderStatus } from 'src/entities/order.entity';

class OrderItemDto {
    @IsNumber()
    @IsNotEmpty()
    stockId: number;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;
}

export class CreateOrderDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsArray()
    @ValidateNested({each :true})
    @Type(()=> OrderItemDto)
    items: OrderItemDto[]

    @IsEnum(OrderStatus)
    @IsNotEmpty()
    status: OrderStatus
}