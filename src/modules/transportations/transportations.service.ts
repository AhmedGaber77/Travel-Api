import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTransportationDto } from './dto/update-transportation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TransportationEntity } from './entities/transportation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransportationsService {
  constructor(
    @InjectRepository(TransportationEntity)
    private transportationRepository: Repository<TransportationEntity>,
  ) {}
  async findAll() {
    return this.transportationRepository.find();
  }

  async findOne(id: number) {
    const transportation = await this.transportationRepository.findOne({
      where: { id },
      relations: ['service'],
    });
    if (!transportation) {
      throw new NotFoundException(`Transportation with id ${id} not found`);
    }
    return transportation;
  }

  async update(id: number, updateTransportationDto: UpdateTransportationDto) {
    const existingTransportation = await this.findOne(id);
    this.transportationRepository.merge(
      existingTransportation,
      updateTransportationDto,
    );
    return this.transportationRepository.save(existingTransportation);
  }
}
