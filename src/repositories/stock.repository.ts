import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from '../entities/stock.entity';

@Injectable()
export class StockRepository {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepo: Repository<Stock>,
  ) {}

  async findAll() {
    return await this.stockRepo.find();
  }

  async findPaginated(skip: number, take: number) {
    return await this.stockRepo.find({
      skip: skip,
      take: take,
      order: { quantity: 'ASC' },
    });
  }

  async findOne(id: number) {
    return await this.stockRepo.findOne({ where: { id } });
  }

  async findOneByName(partName: string) {
    return await this.stockRepo.findOne({ where: { partName } });
  }

  async save(stock: Stock) {
    return await this.stockRepo.save(stock);
  }

  async delete(id: number) {
    return await this.stockRepo.delete(id);
  }

  async isStockLow(partName: string): Promise<boolean> {
    const part = await this.stockRepo.findOne({ where: { partName } });
    return part! && part!.quantity < 5; 
  }
}
