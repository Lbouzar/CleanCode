import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationController } from 'src/controllers/reservation.controller';
import { Reservation } from '../entities/reservation.entity';
import { ReservationRepository } from '../repositories/reservation.repository';
import { ReservationService } from '../services/reservation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation])],
  providers: [ReservationRepository, ReservationService],
  controllers: [ReservationController],
  exports: [ReservationService],
})
export class ReservationModule {}
