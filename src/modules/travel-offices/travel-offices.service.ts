import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTravelOfficeDto } from './dto/create-travel-office.dto';
import { UpdateTravelOfficeDto } from './dto/update-travel-office.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TravelOfficeEntity } from './entities/travel-office.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TravelOfficesService {
  constructor(
    @InjectRepository(TravelOfficeEntity)
    private travelOfficeRepository: Repository<TravelOfficeEntity>,
  ) {}
  create(createTravelOfficeDto: CreateTravelOfficeDto) {
    const travelOffice = this.travelOfficeRepository.create(
      createTravelOfficeDto,
    );
    return this.travelOfficeRepository.save(travelOffice);
  }

  findAll() {
    const travelOffices = this.travelOfficeRepository.find();
    return travelOffices;
  }

  findOne(id: number) {
    const travelOffice = this.travelOfficeRepository.findOne({ where: { id } });
    if (!travelOffice) {
      throw new NotFoundException(`travelOffice with id ${id} not found`);
    }
    return travelOffice;
  }

  async update(id: number, updateTravelOfficeDto: UpdateTravelOfficeDto) {
    const ExistingTravelOffice = await this.travelOfficeRepository.findOne({
      where: { id },
    });
    if (!ExistingTravelOffice) {
      throw new NotFoundException(`travelOffice with id ${id} not found`);
    }
    await this.travelOfficeRepository.update(id, updateTravelOfficeDto);
    return this.travelOfficeRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    const result = await this.travelOfficeRepository.update(id, {
      deletedAt: new Date(),
    });

    if (result.affected === 0) {
      throw new NotFoundException(`travelOffice with id ${id} not found`);
    }
  }
}
