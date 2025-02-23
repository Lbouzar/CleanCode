import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserProfile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    license: string;

    @Column()
    preferredModel: string;
}
