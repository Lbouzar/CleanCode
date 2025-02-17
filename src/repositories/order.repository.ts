import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order, OrderStatus } from "src/entities/order.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrderRepository {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepo : Repository<Order>
    ){}

    async findAll() {
        return await this.orderRepo.find()
    };

    async findOne(id : number) {
        return await this.orderRepo.findOne({where : {id}});
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

    async findByPartName(partName : string){
        return await this.orderRepo.createQueryBuilder('order')
        .leftJoinAndSelect('order.stock','stock')
        .where('stock.partName = :partName', { partName})
        .getMany();
    }



    async save(order: Order){
        return await this.orderRepo.save(order);
    }

    async delete(id : number){
        return await this.orderRepo.delete(id)
     }
}