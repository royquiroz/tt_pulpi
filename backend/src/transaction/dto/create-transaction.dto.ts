/* eslint-disable prettier/prettier */
import {
  IsEnum,
  IsInt,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { TransactionStatus } from '../entities/transaction.entity';

export class CreateTransactionDto {
  @IsString()
  @MinLength(13)
  rfc: string;

  @IsString()
  retirement_date: string;

  @IsEnum(TransactionStatus)
  status: TransactionStatus;

  @IsInt()
  @IsPositive()
  amount: number;

  @IsInt()
  @IsPositive()
  comision: number;
}
