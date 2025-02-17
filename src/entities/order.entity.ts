import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderItem } from './orderItem.entity';
import { User } from './user.entity';

export enum OrderStatus {
    PENDING = "PENDING",       // Order placed but not confirmed
    CONFIRMED = "CONFIRMED",   // Supplier acknowledged the order
    SHIPPED = "SHIPPED",       // Supplier has shipped the order
    RECEIVED = "RECEIVED",     // Your company has received the stock
    CANCELLED = "CANCELLED"    // Order was canceled
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;


  // Track who placed the order (Only Admins can place orders - Enforce this in service)
  @ManyToOne(() => User)
  user: User;
  
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {cascade : true})
  items : OrderItem[];

  

  // TODO: Ajouter une table OrderItem, Necessaire

  @Column({type: "enum", enum: OrderStatus, default: OrderStatus.PENDING})
  status : OrderStatus;

 

  @Column({type: 'timestamp', default : ()=>'CURRENT_TIMESTAMP'})
  orderDate: Date;

}
