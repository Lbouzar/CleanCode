import { BadRequestException, Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Maintenance } from '../schemas/maintenance.schema';
import { MaintenanceService } from '../services/maintenance.service';

@Controller('maintenance')
export class MaintenanceController {

    constructor(private readonly maintenanceService : MaintenanceService){}

    @Get()
    async getAllMaintenanceLogs(){
        return await this.maintenanceService.getAllMaintenanceLogs();
    }

    @Get(':id')
    async getMaintenanceById(@Param('id') id: string){
        return await this.maintenanceService.getMaintenanceById(id);
    }

    @Post()
    async createMaintenanceLogs(@Body() maintenance: Maintenance){
        if(!maintenance.type || !maintenance.scooterId){
            throw new BadRequestException('Invalid maintenance data');
        }
        return await this.maintenanceService.createMaintenanceLog(maintenance);

    }

    @Post('close-old')
    async closeOldMaintenanceLogs(){
        return await this.maintenanceService.closeOldMaintenanceLogs();
    }

    @Delete(':id')
    async deleteMaintenanceLogs(@Param('id') id: string){
        return await this.maintenanceService.deleteMaintenanceLog(id)
    }


    @Post('perform')
    async performMaintenance(
        @Body() { scooterId, type, usedStock, details, cost }: 
        { scooterId: string, type: string, usedStock: { stockId: number, quantity: number }[], details?: string, cost?: number }
    ) {
        return await this.maintenanceService.performMaintenance(scooterId, type, usedStock, details, cost);
    }

    @Get('history')
    async getMaintenanceHistory() {
        return await this.maintenanceService.getMaintenanceHistory();
    }
}





