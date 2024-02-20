import { Controller, Get, Body, Patch, Param, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { UpdateAccountDto } from './dto/update-account.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  // @Post()
  // create(@Body() createAccountDto: CreateAccountDto) {
  //   return this.accountsService.create(createAccountDto);
  // }

  @Get()
  findAll() {
    return this.accountsService.findAllAccounts();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOneAccount(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(+id, updateAccountDto);
  }

  @Get(':id/transactions')
  findAllAccountTransactions(@Param('id') id: string) {
    return this.accountsService.findAllAccountTransactions(+id);
  }

  @Get(':id/transactions/:transactionId')
  findOneAccountTransaction(
    @Param('id') id: string,
    @Param('transactionId') transactionId: string,
  ) {
    return this.accountsService.findOneAccountTransaction(+id, +transactionId);
  }

  @Post(':id/transactions')
  createTransaction(
    @Param('id') id: string,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.accountsService.createAccountTransaction(
      +id,
      createTransactionDto,
    );
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.accountsService.remove(+id);
  // }
}
