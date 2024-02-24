import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AccountEntity } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AccountRepository extends Repository<AccountEntity> {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {
    super(
      accountRepository.target,
      accountRepository.manager,
      accountRepository.queryRunner,
    );
  }
  async findAllAccounts(): Promise<AccountEntity[]> {
    return this.accountRepository.find({
      relations: { travelOffice: true },
      select: { travelOffice: { name: true, email: true } },
    });
  }
}
