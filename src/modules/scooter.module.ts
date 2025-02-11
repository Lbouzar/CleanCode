import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScooterRepository } from '../repositories/scooter.repository';
import { Scooter, ScooterSchema } from '../schemas/scooter.schema';
import { ScooterService } from '../services/scooter.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Scooter.name, schema: ScooterSchema }])],
  providers: [ScooterRepository, ScooterService],
  exports: [ScooterService],
})
export class ScooterModule {}
