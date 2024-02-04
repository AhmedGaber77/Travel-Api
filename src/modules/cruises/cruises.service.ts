import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCruiseDto } from './dto/update-cruise.dto';
import { CruiseEntity } from './entities/cruise.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CruisesService {
  constructor(
    @InjectRepository(CruiseEntity)
    private readonly cruiseRepository: Repository<CruiseEntity>,
  ) {}

  findAll() {
    return this.cruiseRepository.find();
  }

  async findOne(id: number) {
    const cruise = await this.cruiseRepository.findOne({
      where: { id },
      relations: ['service'],
    });
    if (!cruise) {
      throw new NotFoundException(`Cruise with id ${id} not found`);
    }
    return cruise;
  }

  async update(id: number, updateCruiseDto: UpdateCruiseDto) {
    const existingCruise = await this.findOne(id);
    this.cruiseRepository.merge(existingCruise, updateCruiseDto);
    return this.cruiseRepository.save(existingCruise);
  }
}
