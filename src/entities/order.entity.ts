import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Stock } from './stock.entity';
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

//Uniquement Admin, tester dans le service, si user =/= admin, la commande ne peut pas être effectuer
//Important de garder une trace de qui a effectué la commande.
  @ManyToOne(() => User)
  @JoinTable()
  user: User;

  @ManyToMany(() => Stock)
  @JoinTable()
  stock : Stock[];

  // TODO: Ajouter une table OrderItem, Necessaire

  @Column({type: "enum", enum: OrderStatus, default: OrderStatus.PENDING})
  status : OrderStatus;

  @Column({type : "number"})
  quantity : number

  @Column({type: 'timestamp', default : ()=>'CURRENT_TIMESTAMP'})
  orderDate: Date;

}
