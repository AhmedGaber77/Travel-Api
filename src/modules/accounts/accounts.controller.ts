import {
  Controller,
  Get,
  Body,
  Param,
  Post,
  UseGuards,
  Request,
  Delete,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @Get()
  findAllAccounts() {
    return this.accountsService.findAllAccounts();
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @Get(':id')
  findOneAccount(@Request() req, @Param('id') id: string) {
    return this.accountsService.findOneAccount(req.user.id, +id);
  }

  // @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
  //   return this.accountsService.update(+id, updateAccountDto);
  // }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @Get(':id/transactions')
  findAllAccountTransactions(@Request() req, @Param('id') id: string) {
    return this.accountsService.findAllAccountTransactions(req.user.id, +id);
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @Get(':id/transactions/:transactionId')
  findOneAccountTransaction(
    @Request() req,
    @Param('id') id: string,
    @Param('transactionId') transactionId: string,
  ) {
    return this.accountsService.findOneAccountTransaction(
      req.user.id,
      +id,
      +transactionId,
    );
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
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

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @Delete(':id/transactions/:transactionId')
  softDeleteTransaction(
    @Param('id') id: string,
    @Param('transactionId') transactionId: string,
  ) {
    return this.accountsService.softDeleteAccountTransaction(
      +id,
      +transactionId,
    );
  }
}
