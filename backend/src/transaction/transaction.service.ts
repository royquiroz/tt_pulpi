/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { User } from './entities/users.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,

    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const user = await this.findUser(createTransactionDto?.rfc);
    if (user?.status === 'LOCKED')
      throw new HttpException(
        'This transaction cannot be created because the user is blocked.',
        HttpStatus.UNAUTHORIZED,
      );

    const folio = await this.createFolio();

    const transaction = await this.transactionModel.create({
      folio,
      ...createTransactionDto,
    });

    return transaction;
  }

  private async createFolio() {
    const transactions = await this.transactionModel.find().sort({ folio: 1 });

    const folio = transactions[transactions.length - 1]?.folio;
    const newFolio = `AAF${Number(folio.slice(3)) + 1}`;

    return newFolio;
  }

  async findAll(query) {
    const findQuery = Object.fromEntries(
      Object.entries(query).filter(([_, v]) => v != null),
    );

    const queryDates = this.createQueryDates({
      init: query?.init_date,
      end: query?.end_date,
    });
    delete findQuery?.init_date;
    delete findQuery?.end_date;

    const transactions = await this.transactionModel.find({
      ...findQuery,
      ...queryDates,
    });

    return transactions;
  }

  async update(query) {
    const { id, status } = query;

    const transaction = await this.findTansaction(id);

    if (transaction?.status !== 'PENDING')
      throw new HttpException(
        'This transaction cannot be modified because it has no pending status.',
        HttpStatus.UNAUTHORIZED,
      );

    const updateTransaction = await this.transactionModel.findByIdAndUpdate(
      id,
      {
        status: status,
      },
    );

    return updateTransaction;
  }

  async remove(id: string) {
    await this.transactionModel.findByIdAndUpdate(id, {
      is_delete: true,
    });

    return;
  }

  private async findUser(rfc: string) {
    return await this.userModel.findOne({ rfc });
  }

  private async findTansaction(id: string) {
    return await this.transactionModel.findById({ _id: id });
  }

  private createQueryDates(dates) {
    const { init, end } = dates;

    if ((!init && !end) || (!end && init)) return {};

    if (!init) {
      return {
        retirement_date: {
          $lte: new Date(end),
        },
      };
    }

    return {
      retirement_date: {
        $gte: new Date(init),
        $lte: new Date(end),
      },
    };
  }
}
