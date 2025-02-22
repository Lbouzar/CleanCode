import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StockRepository } from 'src/repositories/stock.repository';
import { MaintenanceRepository } from '../repositories/maintenance.repository';
import { Maintenance, MaintenanceDocument } from '../schemas/maintenance.schema';

@Injectable()
export class MaintenanceService {
  constructor(private readonly maintenanceRepository: MaintenanceRepository,
              private readonly stockRepository : StockRepository,
              @InjectModel(Maintenance.name) private maintenanceModel: Model<MaintenanceDocument>,
  ) {}

  async getAllMaintenanceLogs(): Promise<Maintenance[]> {
    return this.maintenanceRepository.findAll();
  }

  async getMaintenanceById(id: string): Promise<Maintenance | null> {
    return this.maintenanceRepository.findOne(id);
  }

  async createMaintenanceLog(maintenance: Maintenance): Promise<Maintenance> {
    return this.maintenanceRepository.save(maintenance);
  }

  async deleteMaintenanceLog(id: string): Promise<void> {
    await this.maintenanceRepository.delete(id);
  }

  async closeOldMaintenanceLogs() {
    return this.maintenanceRepository.closeOldMaintenanceLogs();
  }

  async performMaintenance(scooterId: string, type: string, usedStock: { stockId: number; quantity: number }[], details?: string, cost?: number) {
    const stockUpdates: number[] = [];

    for (const item of usedStock) {
        const stock = await this.stockRepository.findOne(item.stockId);

        if (!stock) {
            throw new NotFoundException(`Stock item with ID ${item.stockId} not found`);
        }

        if (stock.quantity < item.quantity) {
            throw new BadRequestException(`Not enough stock available for ${stock.partName}. Only ${stock.quantity} left.`);
        }

        // Reduce stock quantity
        stock.quantity -= item.quantity;
        await this.stockRepository.save(stock);
        stockUpdates.push(stock.id); // Store updated stock IDs
    }

    // Save Maintenance record with used stock references
    const newMaintenance = new this.maintenanceModel({
        scooterId,
        type,
        date: new Date(),
        details,
        cost,
        usedStockItems: stockUpdates, // Save the used stock IDs
    });

    return await newMaintenance.save();
}

async getMaintenanceHistory() {
  return await this.maintenanceModel.find().populate('usedStockItems').exec();
}

}
