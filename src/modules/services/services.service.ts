import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity } from './entities/service.entity';
import { Repository } from 'typeorm';
import { WholesalerEntity } from '../wholesalers/entities/wholesaler.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(ServiceEntity)
    private serviceRepository: Repository<ServiceEntity>,
    @InjectRepository(WholesalerEntity)
    private wholesalerRepository: Repository<WholesalerEntity>,
  ) {}
  async create(createServiceDto: CreateServiceDto) {
    const wholesaler = await this.wholesalerRepository.findOne({
      where: { id: createServiceDto.WholesalerId },
    });
    if (!wholesaler) {
      throw new NotFoundException(
        `Wholesaler with id ${createServiceDto.WholesalerId} not found`,
      );
    }
    const service = this.serviceRepository.create(createServiceDto);
    return this.serviceRepository.save(service);
  }

  findAll() {
    return this.serviceRepository.find();
  }

  async findOne(id: number) {
    const service = await this.serviceRepository.findOne({ where: { id } });
    if (!service) {
      throw new NotFoundException(`service with id ${id} not found`);
    }
    return service;
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    const existingService = await this.serviceRepository.findOne({
      where: { id },
    });
    if (!existingService) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }
    if (updateServiceDto.WholesalerId) {
      const wholesaler = await this.wholesalerRepository.findOne({
        where: { id: updateServiceDto.WholesalerId },
      });
      if (!wholesaler) {
        throw new NotFoundException(
          `Wholesaler with id ${updateServiceDto.WholesalerId} not found`,
        );
      }
    }

    await this.serviceRepository.update(id, updateServiceDto);
    return this.serviceRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    const result = await this.serviceRepository.update(id, {
      deletedAt: new Date(),
    });
    if (result.affected === 0) {
      throw new NotFoundException(`service with id ${id} not found`);
    }
  }
}
