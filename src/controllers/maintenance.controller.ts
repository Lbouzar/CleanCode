import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Maintenance } from '../schemas/maintenance.schema';
import { MaintenanceService } from '../services/maintenance.service';
import { MailerService } from 'src/services/mailer.service';
import { Incident } from 'src/schemas/incident.schema';
import { NotifyManagerDto } from '../dto/notify-manager.dto';

@ApiBearerAuth()
@ApiTags('maintenance')
@Controller('maintenance')
export class MaintenanceController {
  constructor(
    private readonly maintenanceService: MaintenanceService,
    private readonly emailService: MailerService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all maintenance logs' })
  @ApiResponse({ status: 200, description: 'Return all maintenance logs' })
  async getAllMaintenanceLogs() {
    return await this.maintenanceService.getAllMaintenanceLogs();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get maintenance log by ID' })
  @ApiResponse({ status: 200, description: 'Return maintenance log by ID' })
  @ApiResponse({ status: 404, description: 'Maintenance log not found' })
  async getMaintenanceById(@Param('id') id: string) {
    return await this.maintenanceService.getMaintenanceById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create maintenance log' })
  @ApiResponse({ status: 201, description: 'Maintenance log created' })
  @ApiResponse({ status: 400, description: 'Invalid maintenance data' })
  async createMaintenanceLogs(@Body() maintenance: Maintenance) {
    if (!maintenance.type || !maintenance.scooterId) {
      throw new BadRequestException('Invalid maintenance data');
    }
    return await this.maintenanceService.createMaintenanceLog(maintenance);
  }

  @Post('close-old')
  @ApiOperation({ summary: 'Close old maintenance logs' })
  @ApiResponse({ status: 200, description: 'Old maintenance logs closed' })
  async closeOldMaintenanceLogs() {
    return await this.maintenanceService.closeOldMaintenanceLogs();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete maintenance log' })
  @ApiResponse({ status: 200, description: 'Maintenance log deleted' })
  @ApiResponse({ status: 404, description: 'Maintenance log not found' })
  async deleteMaintenanceLogs(@Param('id') id: string) {
    return await this.maintenanceService.deleteMaintenanceLog(id);
  }

  @Post('interval')
  @ApiOperation({ summary: 'Set maintenance interval' })
  @ApiResponse({ status: 200, description: 'Maintenance interval set' })
  @ApiResponse({
    status: 400,
    description: 'Invalid maintenance interval data',
  })
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
  @ApiOperation({ summary: 'Get maintenance interval' })
  @ApiResponse({ status: 200, description: 'Return maintenance interval' })
  @ApiResponse({ status: 404, description: 'Model not found' })
  async getMaintenanceInterval(@Param('model') model: string) {
    return await this.maintenanceService.getMaintenanceInterval(model);
  }

  @Post('notify')
  @ApiOperation({ summary: 'Notify manager' })
  @ApiResponse({ status: 200, description: 'Notification sent' })
  @ApiResponse({ status: 400, description: 'Invalid email data' })
  async notifyManager(@Body() notifyManagerDto: NotifyManagerDto) {
    const { email, subject, message } = notifyManagerDto;

    if (!email || !subject || !message) {
      throw new BadRequestException('Invalid email data');
    }

    return await this.emailService.sendMail(email, subject, message);
  }

  @Post('incident')
  @ApiOperation({ summary: 'Report incident' })
  @ApiResponse({ status: 201, description: 'Incident reported' })
  @ApiResponse({ status: 400, description: 'Invalid incident data' })
  async reportIncident(@Body() incident: Incident) {
    if (!incident.scooterId || !incident.userId || !incident.description) {
      throw new BadRequestException('Invalid incident data');
    }
    return await this.maintenanceService.reportIncident(incident);
  }

  @Get('incidents')
  @ApiOperation({ summary: 'Get all incidents' })
  @ApiResponse({ status: 200, description: 'Return all incidents' })
  async getIncidents() {
    return await this.maintenanceService.getIncidents();
  }

  @Get('incident/:id')
  @ApiOperation({ summary: 'Get incident by ID' })
  @ApiResponse({ status: 200, description: 'Return incident by ID' })
  @ApiResponse({ status: 404, description: 'Incident not found' })
  async getIncidentById(@Param('id') id: string) {
    return await this.maintenanceService.getIncidentById(id);
  }

  @Post('archive/:id')
  @ApiOperation({ summary: 'Archive maintenance log' })
  @ApiResponse({ status: 200, description: 'Maintenance log archived' })
  @ApiResponse({ status: 404, description: 'Maintenance log not found' })
  async archiveMaintenanceLog(@Param('id') id: string) {
    return await this.maintenanceService.archiveMaintenanceLog(id);
  }

  @Get('archived')
  @ApiOperation({ summary: 'Get archived maintenance logs' })
  @ApiResponse({ status: 200, description: 'Return archived maintenance logs' })
  async getArchivedMaintenanceLogs() {
    return await this.maintenanceService.getArchivedMaintenanceLogs();
  }
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





