import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Scooter {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    model: string;

    @Column()
    available: boolean;
}
