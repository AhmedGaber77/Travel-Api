import { Injectable } from '@nestjs/common';
import { CreateTransportationDto } from './dto/create-transportation.dto';
import { UpdateTransportationDto } from './dto/update-transportation.dto';

@Injectable()
export class TransportationsService {
  create(createTransportationDto: CreateTransportationDto) {
    console.log('createTransportationDto', createTransportationDto);
    return 'This action adds a new transportation';
  }

  findAll() {
    return `This action returns all transportations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transportation`;
  }

  update(id: number, updateTransportationDto: UpdateTransportationDto) {
    console.log('updateTransportationDto', updateTransportationDto);
    return `This action updates a #${id} transportation`;
  }

  remove(id: number) {
    return `This action removes a #${id} transportation`;
  }
}
