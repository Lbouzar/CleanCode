import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MaintenanceController } from 'src/controllers/maintenance.controller';
import { Incident, IncidentSchema } from 'src/schemas/incident.schema';
import { MaintenanceInterval, MaintenanceIntervalSchema } from 'src/schemas/maintenance-interval.schema';
import { MailerService } from 'src/services/mailer.service';
import { MaintenanceRepository } from '../repositories/maintenance.repository';
import { Maintenance, MaintenanceSchema } from '../schemas/maintenance.schema';
import { MaintenanceService } from '../services/maintenance.service';

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
