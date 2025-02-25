import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { Stock } from './stock.entity';

@Entity()

export class OrderItem {
    @PrimaryGeneratedColumn()
    id : number; 

    @ManyToOne(() => Stock)
    stock : Stock;

    @Column({type : "number"})
    quantity : number;

    @ManyToOne(() => Order, (order) => order.items)
    order : Order;
}