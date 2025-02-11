import { BadRequestException, Injectable } from '@nestjs/common';
import { Stock } from '../entities/stock.entity';
import { StockRepository } from '../repositories/stock.repository';

@Injectable()
export class StockService {
  constructor(private readonly stockRepository: StockRepository) {}

  async getAllStock(): Promise<Stock[]> {
    return this.stockRepository.findAll();
  }

  async getStockById(id: number): Promise<Stock> {
    const stock = await this.stockRepository.findOne(id);
    if (!stock) throw new BadRequestException('Stock item not found');
    return stock;
  }

  async createStock(stock: Stock): Promise<Stock> {
    return this.stockRepository.save(stock);
  }

  async removeStock(partName: string, quantity: number): Promise<boolean> {
    const part = await this.stockRepository.findOneByName(partName);
    if (!part || part.quantity < quantity) {
      throw new BadRequestException('Not enough stock available.');
    }
    part.quantity -= quantity;
    await this.stockRepository.save(part);
    return true;
  }

  async checkStockLow(partName: string): Promise<boolean> {
    return this.stockRepository.isStockLow(partName);
  }
}
