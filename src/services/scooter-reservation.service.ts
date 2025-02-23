import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Scooter } from '../entities/scooter.entity';

/**
 * Service to manage scooter reservations.
 * Provides methods to reserve scooters and retrieve available scooters.
 */
@Injectable()
export class ScooterReservationService {
    constructor(
        @InjectRepository(Scooter)
        private scooterRepository: Repository<Scooter>,
    ) {}

    /**
     * Reserves a scooter by its ID if available.
     * @param scooterId - The ID of the scooter to reserve.
     * @returns The reserved scooter.
     * @throws Error if the scooter is not available.
     */
    async reserveScooter(scooterId: number): Promise<Scooter> {
        const scooter = await this.scooterRepository.findOneBy({ id: scooterId });
        if (scooter && scooter.available) {
            scooter.available = false;
            return this.scooterRepository.save(scooter);
        }
        throw new Error('Scooter not available');
    }

    /**
     * Retrieves all available scooters.
     * @returns An array of available scooters.
     */
    async getAvailableScooters(): Promise<Scooter[]> {
        return this.scooterRepository.find({ where: { available: true } });
    }
}
