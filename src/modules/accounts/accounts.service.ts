import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from './entities/account.entity';
import { Repository } from 'typeorm';
import {
  TransactionEntity,
  TransactionType,
} from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
  ) {}

  async findAllAccounts(): Promise<AccountEntity[]> {
    return this.accountRepository.find({
      relations: { travelOffice: true },
      select: { travelOffice: { name: true, email: true } },
    });
  }

  async findOneAccount(id: number): Promise<AccountEntity> {
    const account = await this.accountRepository.findOne({
      where: { id },
      relations: { travelOffice: true },
      select: { travelOffice: { id: true, name: true, email: true } },
    });
    if (!account) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }
    return account;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    console.log(updateAccountDto);
    return `This action updates a #${id} account`;
  }

  async getAllAccountTransactions(accountId: number) {
    const transactions = await this.transactionRepository.find({
      where: { account: { id: accountId } },
    });
    return transactions;
  }

  async findOneAccountTransaction(
    accountId: number,
    transactionId: number,
  ): Promise<TransactionEntity> {
    const transaction = await this.transactionRepository.findOne({
      where: { account: { id: accountId }, id: transactionId },
    });
    if (!transaction) {
      throw new NotFoundException(
        `Transaction with id ${transactionId} not found`,
      );
    }
    return transaction;
  }

  async createAccountTransaction(
    accountId: number,
    transaction: CreateTransactionDto,
  ) {
    const account = await this.accountRepository.findOne({
      where: { id: accountId },
    });
    if (!account) {
      throw new NotFoundException(`Account with id ${accountId} not found`);
    }
    const newTransaction = this.transactionRepository.create(transaction);
    if (transaction.type === TransactionType.Deposit) {
      account.currentBalance += transaction.amount;
    } else if (transaction.type === TransactionType.Withdraw) {
      account.currentBalance -= transaction.amount;
    }
    newTransaction.account = account;
    return await this.transactionRepository.save(newTransaction);
  }
}
