import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Scooter, ScooterDocument } from '../schemas/scooter.schema';

@Injectable()
export class ScooterRepository {
  constructor(
    @InjectModel(Scooter.name) private readonly scooterModel: Model<ScooterDocument>,
  ) {}

  async findAll(): Promise<Scooter[]> {
    return this.scooterModel.find().exec();
  }

  async findOne(id: string): Promise<Scooter | null> {
    return this.scooterModel.findById(id).exec();
  }

  async save(scooter: Scooter): Promise<Scooter> {
    return new this.scooterModel(scooter).save();
  }

  async delete(id: string): Promise<void> {
    await this.scooterModel.findByIdAndDelete(id).exec();
  }

  async findAvailableScooters(): Promise<Scooter[]> {
    return this.scooterModel.find({ status: 'Available' }).exec();
  }
}
