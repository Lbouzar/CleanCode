import { Injectable, BadRequestException } from '@nestjs/common';
import { MaintenanceRepository } from '../repositories/maintenance.repository';
import { Maintenance } from '../schemas/maintenance.schema';
import { MaintenanceInterval } from 'src/schemas/maintenance-interval.schema';
import { Incident } from 'src/schemas/incident.schema';

@Injectable()
export class MaintenanceService {
  constructor(private readonly maintenanceRepository: MaintenanceRepository) {}

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
