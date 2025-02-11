import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ScooterDocument = Scooter & Document;

@Schema()
export class Scooter {
  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  status: string; // Available, In Use, Under Maintenance

  @Prop({ required: true })
  location: string;

  @Prop({ type: Number, required: true })
  batteryLevel: number;
}

export const ScooterSchema = SchemaFactory.createForClass(Scooter);
