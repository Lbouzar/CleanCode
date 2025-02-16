import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MaintenanceDocument = Maintenance & Document;

@Schema()
export class Maintenance {
  @Prop({ required: true })
  scooterId: string;

  @Prop({ required: true })
  type: string; // Preventive, Corrective

  @Prop({ required: true })
  date: Date;

  @Prop()
  details: string; // Notes about the maintenance

  @Prop()
  cost: number;

  @Prop({ default: false })
  archived: boolean;
}

export const MaintenanceSchema = SchemaFactory.createForClass(Maintenance);
