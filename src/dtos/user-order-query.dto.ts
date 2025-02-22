import { IsNotEmpty, IsString } from 'class-validator';

export class UserOrderQueryDto {
    @IsString()
    @IsNotEmpty()
    userName: string; // The username to filter orders
}
