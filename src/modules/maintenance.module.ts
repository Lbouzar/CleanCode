import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MaintenanceController } from 'src/controllers/maintenance.controller';
import { MaintenanceRepository } from '../repositories/maintenance.repository';
import { Maintenance, MaintenanceSchema } from '../schemas/maintenance.schema';
import { MaintenanceService } from '../services/maintenance.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Maintenance.name, schema: MaintenanceSchema }])],
  providers: [MaintenanceRepository, MaintenanceService],
  controllers: [MaintenanceController],
  exports: [MaintenanceService],
})
export class MaintenanceModule {}
