import { Injectable } from '@nestjs/common';
import { CreateTravelOfficeDto } from './dto/create-travel-office.dto';
import { UpdateTravelOfficeDto } from './dto/update-travel-office.dto';

@Injectable()
export class TravelOfficesService {
  create(createTravelOfficeDto: CreateTravelOfficeDto) {
    console.log('createTravelOfficeDto', createTravelOfficeDto);
    return 'This action adds a new travelOffice';
  }

  findAll() {
    return `This action returns all travelOffices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} travelOffice`;
  }

  update(id: number, updateTravelOfficeDto: UpdateTravelOfficeDto) {
    console.log('updateTravelOfficeDto', updateTravelOfficeDto);
    return `This action updates a #${id} travelOffice`;
  }

  remove(id: number) {
    return `This action removes a #${id} travelOffice`;
  }
}
