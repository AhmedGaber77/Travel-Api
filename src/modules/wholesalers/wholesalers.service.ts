import { Injectable } from '@nestjs/common';
import { CreateWholesalerDto } from './dto/create-wholesaler.dto';
import { UpdateWholesalerDto } from './dto/update-wholesaler.dto';

@Injectable()
export class WholesalersService {
  create(createWholesalerDto: CreateWholesalerDto) {
    return 'This action adds a new wholesaler';
  }

  findAll() {
    return `This action returns all wholesalers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wholesaler`;
  }

  update(id: number, updateWholesalerDto: UpdateWholesalerDto) {
    return `This action updates a #${id} wholesaler`;
  }

  remove(id: number) {
    return `This action removes a #${id} wholesaler`;
  }
}
