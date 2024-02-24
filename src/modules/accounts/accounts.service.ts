import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from './entities/account.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import {
  TransactionEntity,
  TransactionType,
} from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { RoleEnum } from 'src/roles/roles.enum';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAllAccounts(): Promise<AccountEntity[]> {
    return this.accountRepository.find({
      relations: { travelOffice: true },
      select: { travelOffice: { name: true, email: true } },
    });
  }

  async findOneAccount(
    userId: UserEntity['id'],
    id: number,
  ): Promise<AccountEntity> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { travelOffice: true },
      select: { travelOffice: { id: true } },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    let where: FindOptionsWhere<AccountEntity> = {};
    where.id = id;
    if (user.role?.id === RoleEnum.travelAgent) {
      if (!user.travelOffice) {
        throw new UnauthorizedException('User Not in a travel office');
      }
      where = { ...where, travelOffice: { id: user.travelOffice.id } };
    }

    const account = await this.accountRepository.findOne({
      where: where,
      relations: { travelOffice: true },
      select: { travelOffice: { id: true, name: true, email: true } },
    });
    if (!account) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }
    return account;
  }

  // update(id: number, updateAccountDto: UpdateAccountDto) {
  //   console.log(updateAccountDto);
  //   return `This action updates a #${id} account`;
  // }

  async findAllAccountTransactions(
    userId: UserEntity['id'],
    accountId: number,
  ) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { travelOffice: true },
      select: { travelOffice: { id: true } },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    let where: FindOptionsWhere<TransactionEntity> = {};
    // where.id = accountId;
    if (user.role?.id === RoleEnum.travelAgent) {
      if (!user.travelOffice) {
        throw new UnauthorizedException('User Not in a travel office');
      }
      where = {
        account: { id: accountId, travelOffice: { id: user.travelOffice.id } },
      };
    }

    const transactions = await this.transactionRepository.find({
      where: where,
      relations: {
        reservation: true,
      },
    });
    return transactions;
  }

  async findOneAccountTransaction(
    userId: UserEntity['id'],
    accountId: number,
    transactionId: number,
  ): Promise<TransactionEntity> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { travelOffice: true },
      select: { travelOffice: { id: true } },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    let where: FindOptionsWhere<TransactionEntity> = {};
    where = { account: { id: accountId }, id: transactionId };
    if (user.role?.id === RoleEnum.travelAgent) {
      if (!user.travelOffice) {
        throw new UnauthorizedException('User Not in a travel office');
      }
      where = {
        account: {
          id: accountId,
          travelOffice: { id: user.travelOffice.id },
        },
        id: transactionId,
      };
    }

    const transaction = await this.transactionRepository.findOne({
      where: where,
      relations: {
        reservation: true,
      },
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

  async softDeleteAccountTransaction(accountId: number, transactionId: number) {
    const transaction = await this.transactionRepository.findOne({
      where: { account: { id: accountId }, id: transactionId },
    });
    if (!transaction) {
      throw new NotFoundException(
        `Transaction with id ${transactionId} not found`,
      );
    }
    if (transaction.type === TransactionType.Deposit) {
      transaction.account.currentBalance -= transaction.amount;
    }
    if (transaction.type === TransactionType.Withdraw) {
      transaction.account.currentBalance += transaction.amount;
    }
    return await this.transactionRepository.softRemove(transaction);
  }
}
