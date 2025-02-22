import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MaintenanceDocument = Maintenance & Document;

@Schema()
export class Maintenance {
  @Prop({ required: true })
  scooterId: string;

  //Todo: enum? 
  @Prop({ required: true })
  type: string; // Preventive, Corrective

  @Prop({ required: true })
  date: Date;

  @Prop()
  details: string; 

  @Prop()
  cost: number;

  @Prop([{ type: Types.ObjectId, ref: 'Stock' }]) 
  usedStockItems: Types.ObjectId[];
}

export const MaintenanceSchema = SchemaFactory.createForClass(Maintenance);
