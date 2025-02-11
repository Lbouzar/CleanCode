import { BadRequestException, Injectable } from '@nestjs/common';
import { ScooterRepository } from '../repositories/scooter.repository';
import { Scooter } from '../schemas/scooter.schema';

@Injectable()
export class ScooterService {
  constructor(private readonly scooterRepository: ScooterRepository) {}

  async getAllScooters(): Promise<Scooter[]> {
    return this.scooterRepository.findAll();
  }

  async getScooterById(id: string): Promise<Scooter | null> {
    return this.scooterRepository.findOne(id);
  }

  async createScooter(scooter: Scooter): Promise<Scooter> {
    return this.scooterRepository.save(scooter);
  }

  async deleteScooter(id: string): Promise<void> {
    await this.scooterRepository.delete(id);
  }

  async checkScooterBeforeUse(scooterId: string): Promise<boolean> {
    const scooter = await this.scooterRepository.findOne(scooterId);
    if (!scooter) throw new BadRequestException('Scooter not found');

    // Prevent usage if the scooter is under maintenance or has a low battery
    return scooter.batteryLevel >= 20 && scooter.status !== 'Under Maintenance';
  }

  async findAvailableScooters(): Promise<Scooter[]> {
    return this.scooterRepository.findAvailableScooters();
  }
}
