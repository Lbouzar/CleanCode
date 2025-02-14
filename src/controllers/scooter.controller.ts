import { BadRequestException, Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Scooter } from '../schemas/scooter.schema';
import { ScooterService } from '../services/scooter.service';


@Controller('scooter')
export class ScooterController {

    constructor(private readonly scooterService : ScooterService){}

    @Get()
    async getAllScooters(){
        return await this.scooterService.getAllScooters()
    }

    @Get(':id')
    async getScooterById(@Param('id') id: string){
        return await this.scooterService.getScooterById(id);
    }

    @Post()
    async createScooter(@Body() scooter: Scooter){
        if(!scooter.model || scooter.batteryLevel < 0){
            throw new BadRequestException('Invalid scooter data')
        }
        return await this.scooterService.createScooter(scooter)
    }

    @Get('available')
    async findAvailableScooter(){
        return await this.scooterService.findAvailableScooters()
    }

    @Get('check/:id')
    async checkScooterBeforeUse(@Param('id') scooterId: string){
        return await this.scooterService.checkScooterBeforeUse(scooterId);
    }

    @Delete(':id')
    async deleteScooter(@Param('id') id: string){
        return await this.scooterService.deleteScooter(id);
    }

}