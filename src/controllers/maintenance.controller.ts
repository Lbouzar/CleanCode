import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { Maintenance } from '../schemas/maintenance.schema';
import { MaintenanceService } from '../services/maintenance.service';
import { MailerService } from 'src/services/mailer.service';
import { Incident } from 'src/schemas/incident.schema';

@Controller('maintenance')
export class MaintenanceController {
  constructor(
    private readonly maintenanceService: MaintenanceService,
    private readonly emailService: MailerService,
  ) {}

  @Get()
  async getAllMaintenanceLogs() {
    return await this.maintenanceService.getAllMaintenanceLogs();
  }

  @Get(':id')
  async getMaintenanceById(@Param('id') id: string) {
    return await this.maintenanceService.getMaintenanceById(id);
  }

  @Post()
  async createMaintenanceLogs(@Body() maintenance: Maintenance) {
    if (!maintenance.type || !maintenance.scooterId) {
      throw new BadRequestException('Invalid maintenance data');
    }
    return await this.maintenanceService.createMaintenanceLog(maintenance);
  }

  @Post('close-old')
  async closeOldMaintenanceLogs() {
    return await this.maintenanceService.closeOldMaintenanceLogs();
  }

  @Delete(':id')
  async deleteMaintenanceLogs(@Param('id') id: string) {
    return await this.maintenanceService.deleteMaintenanceLog(id);
  }

  @Post('interval')
  async setMaintenanceInterval(
    @Body('model') model: string,
    @Body('interval') interval: number,
  ) {
    if (!model || !interval) {
      throw new BadRequestException('Invalid maintenance interval data');
    }
    return await this.maintenanceService.setMaintenanceInterval(
      model,
      interval,
    );
  }

  @Get('interval/:model')
  async getMaintenanceInterval(@Param('model') model: string) {
    return await this.maintenanceService.getMaintenanceInterval(model);
  }

  @Post('notify')
  async notifyManager(
    @Body('email') email: string,
    @Body('subject') subject: string,
    @Body('message') message: string,
  ) {
    if (!email || !subject || !message) {
      throw new BadRequestException('Invalid email data');
    }
    return await this.emailService.sendMail(email, subject, message);
  }

  @Post('incident')
  async reportIncident(@Body() incident: Incident) {
    if (!incident.scooterId || !incident.userId || !incident.description) {
      throw new BadRequestException('Invalid incident data');
    }
    return await this.maintenanceService.reportIncident(incident);
  }

  @Get('incidents')
  async getIncidents() {
    return await this.maintenanceService.getIncidents();
  }

  @Get('incident/:id')
  async getIncidentById(@Param('id') id: string) {
    return await this.maintenanceService.getIncidentById(id);
  }

  @Post('archive/:id')
  async archiveMaintenanceLog(@Param('id') id: string) {
    return await this.maintenanceService.archiveMaintenanceLog(id);
  }

  @Get('archived')
  async getArchivedMaintenanceLogs() {
    return await this.maintenanceService.getArchivedMaintenanceLogs();
  }
}
