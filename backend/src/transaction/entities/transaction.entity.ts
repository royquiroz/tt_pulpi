/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum TransactionStatus {
  FAILED = 'FAILED',
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
}

@Schema()
export class Transaction extends Document {
  @Prop({
    type: String,
    index: true,
  })
  rfc: string;

  @Prop({
    type: String,
    unique: true,
    index: true,
  })
  folio: string;

  @Prop({
    type: Date,
  })
  retirement_date: Date;

  @Prop({
    type: String,
    enum: TransactionStatus,
  })
  status: TransactionStatus;

  @Prop({
    type: Number,
  })
  amount: number;

  @Prop({
    type: Number,
  })
  comision: number;

  @Prop({
    type: Boolean,
    default: false,
  })
  is_delete: boolean;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
