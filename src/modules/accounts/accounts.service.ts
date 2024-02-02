import { Injectable } from '@nestjs/common';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from './entities/account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
  ) {}
  // create(createAccountDto: CreateAccountDto) {}

  findAll() {
    return `This action returns all accounts`;
  }

  findOne(id: number) {
    return this.accountRepository.findOne({
      where: { id },
      relations: ['travelOffice'],
    });
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    console.log(updateAccountDto);
    return `This action updates a #${id} account`;
  }

  // remove(id: number) {
  //   return `This action removes a #${id} account`;
  // }
}
