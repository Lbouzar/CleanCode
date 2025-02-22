import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order, OrderStatus } from "src/entities/order.entity";
import { OrderItem } from "src/entities/orderItem.entity";
import { Stock } from "src/entities/stock.entity";
import { Repository } from "typeorm";


@Injectable()
export class OrderRepository {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepo : Repository<Order>
    ){}

    async findOne(id: number) {
        return await this.orderRepo.findOne({
            where: { id },
            relations: ['items', 'items.stock'], 
        });
    }
    
    async findAll() {
        return await this.orderRepo.find({
            relations: ['items', 'items.stock'], 
            order: { orderDate: 'DESC' }, 
        });
    }

    async findByOrderStatus(status : OrderStatus ) {
        return await this.orderRepo.find({where : {status}});
    }

    async findByUserName(userName : string){
        return await this.orderRepo.createQueryBuilder('order')
        .leftJoinAndSelect('order.user','user')
        .where('user.name = :userName', {userName})
        .getMany()
    }
    
    async updateStock(orderStatus: OrderStatus, stock: Stock, orderItem: OrderItem) {
        if (orderStatus !== OrderStatus.SHIPPED) return;
    
        return await this.orderRepo.createQueryBuilder()
            .update(Stock)
            .set({ quantity: () => `quantity - ${orderItem.quantity}` }) 
            .where('id = :stockId', { stockId: stock.id })
            .execute();
    }
    

    async save(order: Order){
        return await this.orderRepo.save(order);
    }

    async delete(id : number){
        return await this.orderRepo.delete(id)
     }
}