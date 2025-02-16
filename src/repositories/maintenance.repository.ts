import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Maintenance,
  MaintenanceDocument,
} from '../schemas/maintenance.schema';
import {
  MaintenanceInterval,
  MaintenanceIntervalDocument,
} from 'src/schemas/maintenance-interval.schema';
import { Incident, IncidentDocument } from 'src/schemas/incident.schema';

@Injectable()
export class MaintenanceRepository {
  constructor(
    @InjectModel(Maintenance.name)
    private readonly maintenanceModel: Model<MaintenanceDocument>,
    @InjectModel(MaintenanceInterval.name)
    private readonly maintenanceIntervalModel: Model<MaintenanceIntervalDocument>,
    @InjectModel(Incident.name)
    private readonly incidentModel: Model<IncidentDocument>,
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
      { status: 'Closed' },
    );
  }

  async setMaintenanceInterval(
    model: string,
    interval: number,
  ): Promise<MaintenanceInterval> {
    return this.maintenanceIntervalModel
      .findOneAndUpdate({ model }, { interval }, { new: true, upsert: true })
      .exec();
  }

  async getMaintenanceInterval(
    model: string,
  ): Promise<MaintenanceInterval | null> {
    return this.maintenanceIntervalModel.findOne({ model }).exec();
  }

  async saveIncident(incident: Incident): Promise<Incident> {
    return new this.incidentModel(incident).save();
  }

  async findAllIncidents(): Promise<Incident[]> {
    return this.incidentModel.find().exec();
  }

  async findOneIncident(id: string): Promise<Incident | null> {
    return this.incidentModel.findById(id).exec();
  }

  async findArchived(): Promise<Maintenance[]> {
    return this.maintenanceModel.find({ archived: true }).exec();
  }
}
