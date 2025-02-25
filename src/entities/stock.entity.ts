import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  partName: string;

  @Column()
  quantity: number;

  @Column()
  supplier: string;

  @Column({ type: 'decimal' })
  price: number;
}
