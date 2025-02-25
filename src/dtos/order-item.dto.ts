import { IsNotEmpty, IsNumber } from 'class-validator';

export class OrderItemDto {
    @IsNumber()
    @IsNotEmpty()
    stockId: number;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;
}
