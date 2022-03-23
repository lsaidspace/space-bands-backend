import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class OnlineStatus {
  @Prop()
  online: boolean;

  @Prop()
  offlineAlert: boolean;
}

@Schema()
export class Action {
  @Prop()
  id: string;

  @Prop()
  type: 'call' | 'directions';

  @Prop()
  label: string;

  @Prop()
  value: string;

  @Prop()
  isPrimary: boolean;
}

export class Branch extends Document {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  onlineStatus: OnlineStatus;

  @Prop()
  bpmAverage: number;

  @Prop()
  actions: Action[];
}

export const BranchSchema = SchemaFactory.createForClass(Branch);
