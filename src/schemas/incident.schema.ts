import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IncidentDocument = Incident & Document;

@Schema()
export class Incident {
  @Prop({ required: true })
  scooterId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: Date.now })
  reportedAt: Date;
}

export const IncidentSchema = SchemaFactory.createForClass(Incident);
