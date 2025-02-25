import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MaintenanceController } from 'src/controllers/maintenance.controller';
import { MaintenanceRepository } from '../repositories/maintenance.repository';
import { Maintenance, MaintenanceSchema } from '../schemas/maintenance.schema';
import { MaintenanceService } from '../services/maintenance.service';
import { MailerService } from 'src/services/mailer.service';
import { MaintenanceIntervalSchema } from 'src/schemas/maintenance-interval.schema';
import { IncidentSchema } from 'src/schemas/incident.schema';
import { MaintenanceInterval } from 'src/schemas/maintenance-interval.schema';
import { Incident } from 'src/schemas/incident.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Maintenance.name, schema: MaintenanceSchema },
      { name: MaintenanceInterval.name, schema: MaintenanceIntervalSchema },
      { name: Incident.name, schema: IncidentSchema },
    ]),
    ConfigModule.forRoot(),
  ],
  controllers: [MaintenanceController],
  providers: [MaintenanceService, MaintenanceRepository, MailerService],
})
export class MaintenanceModule {}
