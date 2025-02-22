import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { Stock } from './stock.entity';

@Entity()

export class OrderItem {
    @PrimaryGeneratedColumn()
    id : number; 

    //from la doc: Eager relations are loaded automatically each time you load entities from the database
    //and we need to load stock everytime we fetch an orderItem.
    @ManyToOne(() => Stock, {eager: true})
    stock : Stock;

    @Column({type : "number"})
    quantity : number;

    @ManyToOne(() => Order, (order) => order.items, {onDelete: 'CASCADE'})
    order : Order;
}