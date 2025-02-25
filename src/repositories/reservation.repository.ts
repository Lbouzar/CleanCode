import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Reservation } from '../entities/reservation.entity';

@Injectable()
export class ReservationRepository {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepo: Repository<Reservation>,
  ) {}

  async findAll() {
    return await this.reservationRepo.find();
  }

  async findOne(id: number) {
    return await this.reservationRepo.findOne({ where: { id } });
  }

  async save(reservation: Reservation) {
    return await this.reservationRepo.save(reservation);
  }

  async delete(id: number) {
    return await this.reservationRepo.delete(id);
  }

  async isScooterAlreadyReserved(scooterId: string, startTime: Date, endTime: Date): Promise<boolean> {
    const overlappingReservations = await this.reservationRepo.find({
      where: {
        scooterId,
        startTime: LessThanOrEqual(endTime),
        endTime: MoreThanOrEqual(startTime),
      },
    });
    return overlappingReservations.length > 0;
  }
}
