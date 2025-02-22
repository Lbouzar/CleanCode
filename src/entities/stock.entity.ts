import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  partName: string;

  @Column()
  quantity: number;


  //minimum quantity before sending low quantity alert.
  @Column({ default: 5})
  minQuantity: number;

  @Column()
  supplier: string;

  @Column({ type: 'decimal' })
  price: number;
}
