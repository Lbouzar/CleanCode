import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MaintenanceRepository } from 'src/repositories/maintenance.repository';
import { Incident } from 'src/schemas/incident.schema';
import { MaintenanceInterval } from 'src/schemas/maintenance-interval.schema';
import { Maintenance, MaintenanceDocument } from '../schemas/maintenance.schema';
import { StockService } from './stock.service';

@Injectable()
export class MaintenanceService {
  stockService: StockService;
  constructor(
               private readonly maintenanceRepository: MaintenanceRepository,
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

  async performMaintenance(
    scooterId: string,
    type: string,
    usedStock: { stockId: number; quantity: number }[],
    details?: string,
    cost?: number
) {
    const stockUpdates: number[] = [];

    for (const item of usedStock) {
        await this.stockService.decreaseStock(item.stockId, item.quantity);
        stockUpdates.push(item.stockId); // Store updated stock IDs
    }

   // Save Maintenance record with used stock references
    const newMaintenance = new this.maintenanceModel({
        scooterId,
        type,
        date: new Date(),
        details,
        cost,
        usedStockItems: stockUpdates,
    });

    return await newMaintenance.save();
}


async getMaintenanceHistory() {
  return await this.maintenanceModel.find().populate('usedStockItems').exec();
}


  async setMaintenanceInterval(
    model: string,
    interval: number,
  ): Promise<MaintenanceInterval> {
    return this.maintenanceRepository.setMaintenanceInterval(model, interval);
  }

  async getMaintenanceInterval(
    model: string,
  ): Promise<MaintenanceInterval | null> {
    return this.maintenanceRepository.getMaintenanceInterval(model);
  }

  async reportIncident(incident: Incident): Promise<Incident> {
    return this.maintenanceRepository.saveIncident(incident);
  }

  async getIncidents(): Promise<Incident[]> {
    return this.maintenanceRepository.findAllIncidents();
  }

  async getIncidentById(id: string): Promise<Incident | null> {
    return this.maintenanceRepository.findOneIncident(id);
  }

  async archiveMaintenanceLog(id: string): Promise<Maintenance> {
    const maintenanceLog = await this.maintenanceRepository.findOne(id);
    if (!maintenanceLog) {
      throw new BadRequestException('Maintenance log not found');
    }
    maintenanceLog.archived = true;
    return this.maintenanceRepository.save(maintenanceLog);
  }

  async getArchivedMaintenanceLogs(): Promise<Maintenance[]> {
    return this.maintenanceRepository.findArchived();
  }
}
