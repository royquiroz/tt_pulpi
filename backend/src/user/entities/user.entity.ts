/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  LOCKED = 'LOCKED',
}

@Schema()
export class User extends Document {
  @Prop({
    type: String,
    unique: true,
    index: true,
  })
  rfc: string;

  @Prop({
    type: String,
  })
  name: string;

  @Prop({
    type: String,
  })
  last_name: string;

  @Prop({
    type: String,
    enum: UserStatus,
  })
  status: UserStatus;
}

export const UserSchema = SchemaFactory.createForClass(User);
