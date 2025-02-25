import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { OrderStatus } from 'src/entities/order.entity';

export class UpdateStockDto{
    @IsEnum(OrderStatus)
    @IsNotEmpty()
    orderStatus: OrderStatus;

    @IsNumber()
    @IsNotEmpty()
    stockId: number;

    @IsNumber()
    @IsNotEmpty()
    orderItemId: number;
}