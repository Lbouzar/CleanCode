import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from 'src/entities/orderItem.entity';
import { Repository } from 'typeorm';


@Injectable()
export class OrderItemRepository {
    constructor(
        @InjectRepository(OrderItem)
        private readonly orderItemRepo : Repository<OrderItem>
    ){}

    async findOne(id: number) {
        return await this.orderItemRepo.findOne({
            where: { id },
            relations: ['stock'], 
        });
    }
    
    async findAll() {
        return await this.orderItemRepo.find({
            relations: ['order', 'stock'], 
        });
    }

    async findByPartName(partName : string){
            return await this.orderItemRepo.createQueryBuilder('orderitem')
            .leftJoinAndSelect('order.stock','stock')
            .where('stock.partName = :partName', { partName})
            .getMany();
    }

    async findBySupplier(supplier : string){
        return await this.orderItemRepo.createQueryBuilder('orderitem')
        .leftJoinAndSelect('orderItem.stock','stock')
        .where('stock.supplier = :supplier',{supplier})
        .getMany()
    }


    async addOrderItem(orderId: number, stockId: number, quantity: number) {
        return await this.orderItemRepo.save({
            order: { id: orderId },
            stock: { id: stockId },
            quantity: quantity,
        });
    }

    async getOrderItemsByOrder(orderId: number) {
        return await this.orderItemRepo.find({ where: { order: { id: orderId } }, relations: ['stock'] });
    }

    async save(orderItem : OrderItem){
        return await this.orderItemRepo.save(orderItem);
    }

    async delete(id : number){
        return await this.orderItemRepo.delete(id);

    }
}