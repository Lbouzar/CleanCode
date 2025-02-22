import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

  async decreaseStock(stockId: number, quantity: number): Promise<Stock> {
    const part = await this.stockRepository.findOne(stockId);
    if (!part || part.quantity < quantity) {
      throw new BadRequestException('Not enough stock available.');
    }
    part.quantity -= quantity;
    return await this.stockRepository.save(part);
    
  }

  async increaseStock(stockId: number, quantity: number) : Promise<Stock> {
    const stock = await this.stockRepository.findOne(stockId);
    if (!stock) throw new NotFoundException(`Stock item ${stockId} not found`);

    stock.quantity += quantity;
    return await this.stockRepository.save(stock);
}

  async deleteStock(id : number) {
    return this.stockRepository.delete(id)
  }

  async checkStockLow(partName: string): Promise<boolean> {
    return this.stockRepository.isStockLow(partName);
  }
}
