import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ScooterDocument = Scooter & Document;

@Schema()
export class Scooter {
  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  location: string;

  //ajouter interval de maintenance

  @Prop({ type: Number, required: true })
  batteryLevel: number;
}

export const ScooterSchema = SchemaFactory.createForClass(Scooter);
