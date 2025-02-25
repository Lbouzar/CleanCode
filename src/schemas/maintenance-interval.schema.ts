import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MaintenanceIntervalDocument = MaintenanceInterval & Document;

@Schema()
export class MaintenanceInterval {
  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  interval: number; // in days
}

export const MaintenanceIntervalSchema = SchemaFactory.createForClass(MaintenanceInterval);