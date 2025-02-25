import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScooterController } from 'src/controllers/scooter.controller';
import { ScooterRepository } from '../repositories/scooter.repository';
import { Scooter, ScooterSchema } from '../schemas/scooter.schema';
import { ScooterService } from '../services/scooter.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Scooter.name, schema: ScooterSchema }])],
  providers: [ScooterRepository, ScooterService],
  controllers: [ScooterController],
  exports: [ScooterService],
})
export class ScooterModule {}
