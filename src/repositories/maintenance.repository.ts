import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Maintenance, MaintenanceDocument } from '../schemas/maintenance.schema';

@Injectable()
export class MaintenanceRepository {
  constructor(
    @InjectModel(Maintenance.name) private readonly maintenanceModel: Model<MaintenanceDocument>,
  ) {}

  async findAll(): Promise<Maintenance[]> {
    return this.maintenanceModel.find().exec();
  }

  async findOne(id: string): Promise<Maintenance | null> {
    return this.maintenanceModel.findById(id).exec();
  }

  async save(maintenance: Maintenance): Promise<Maintenance> {
    return new this.maintenanceModel(maintenance).save();
  }

  async delete(id: string): Promise<void> {
    await this.maintenanceModel.findByIdAndDelete(id).exec();
  }

  async closeOldMaintenanceLogs() {
    return await this.maintenanceModel.updateMany(
      { date: { $lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } }, // Older than 30 days
      { status: 'Closed' }
    );
  }
}
