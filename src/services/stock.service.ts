import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Stock } from '../entities/stock.entity';
import { StockRepository } from '../repositories/stock.repository';
import { NotificationService } from './notification.service';

@Injectable()
export class StockService {
  constructor(private readonly stockRepository: StockRepository,
              private readonly notificationService: NotificationService
  ) {}

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
    const stock = await this.stockRepository.findOne(stockId);
    if (!stock || stock.quantity < quantity) {
      throw new BadRequestException('Not enough stock available.');
    }
    stock.quantity -= quantity;
    if (stock.quantity <= stock.minQuantity) {
      await this.notificationService.sendLowStockAlert(stock.partName, stock.quantity);
  }
    return await this.stockRepository.save(stock);
    
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
