import { BadRequestException, Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Reservation } from '../entities/reservation.entity';
import { ReservationService } from '../services/reservation.service';


@Controller('reservation')
export class ReservationController {

    constructor(private readonly reservationService : ReservationService) {}

    @Get()
    async getAllReservation(){
        return await this.reservationService.getAllReservations()
    }

    @Get(':id')
    async getReservationById(@Param('id') id: number){
        return await this.reservationService.getReservationById(id);
    }

    @Post()
    async createReservation(@Body() reservation: Reservation){
        if(!reservation.user || !reservation.scooterId){
            throw new BadRequestException('Invalid reservation data');
        }
        return await this.reservationService.createReservation(reservation);
    }

    @Delete(':id')
    async deleteReservation(@Param('id') id: number){
        return await this.reservationService.deleteReservation(id);
    }


}