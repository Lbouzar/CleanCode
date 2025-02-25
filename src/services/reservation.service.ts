import { BadRequestException, Injectable } from '@nestjs/common';
import { Reservation } from '../entities/reservation.entity';
import { ReservationRepository } from '../repositories/reservation.repository';

@Injectable()
export class ReservationService {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async getAllReservations(): Promise<Reservation[]> {
    return this.reservationRepository.findAll();
  }

  async getReservationById(id: number): Promise<Reservation> {
    const reservation = await this.reservationRepository.findOne(id);
    if (!reservation) throw new BadRequestException('Reservation not found');
    return reservation;
  }

  async createReservation(reservation: Reservation): Promise<Reservation> {
    const isAlreadyReserved = await this.reservationRepository.isScooterAlreadyReserved(
      reservation.scooterId,
      reservation.startTime,
      reservation.endTime,
    );

    if (isAlreadyReserved) {
      throw new BadRequestException('Scooter is already reserved during this period.');
    }

    return this.reservationRepository.save(reservation);
  }

  async deleteReservation(id: number): Promise<void> {
    await this.reservationRepository.delete(id);
  }
}
