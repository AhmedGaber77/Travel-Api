import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCruiseServiceDto } from './dto/update-cruise.dto';
import { CruiseEntity } from './entities/cruise.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ServiceEntity,
  ServiceType,
} from '../services/entities/service.entity';
import { GalleryEntity } from 'src/image-upload/entities/gallery.entity';
import { CreateCruiseServiceDto } from './dto/create-cruise.dto';

@Injectable()
export class CruisesService {
  constructor(
    @InjectRepository(CruiseEntity)
    private readonly cruiseRepository: Repository<CruiseEntity>,
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,
    @InjectRepository(GalleryEntity)
    private readonly galleryRepository: Repository<GalleryEntity>,
  ) {}
  async createCruiseService(
    createCruiseServiceDto: CreateCruiseServiceDto,
  ): Promise<ServiceEntity> {
    const service = this.serviceRepository.create(
      createCruiseServiceDto.service,
    );
    const cruise = this.cruiseRepository.create(createCruiseServiceDto.cruise);
    service.cruise = cruise;
    service.type = ServiceType.Cruise;
    if (createCruiseServiceDto.service.imageIds) {
      const images = await this.galleryRepository.find({
        where: {
          id: In(createCruiseServiceDto.service.imageIds),
        },
      });
      service.images = images;
    }
    return this.serviceRepository.save(service);
  }

  findAllCruiseServices(): Promise<ServiceEntity[]> {
    return this.serviceRepository.find({
      where: { type: ServiceType.Cruise },
      relations: {
        cruise: true,
      },
    });
  }

  async findOneCruiseService(id: number) {
    const cruise = await this.serviceRepository.findOne({
      where: { id },
      relations: {
        cruise: true,
      },
    });
    if (!cruise) {
      throw new NotFoundException(`Cruise with id ${id} not found`);
    }
    return cruise;
  }

  async updateCruiseService(
    id: number,
    updateCruiseServiceDto: UpdateCruiseServiceDto,
  ): Promise<ServiceEntity> {
    const service = await this.serviceRepository.findOne({
      where: { id, type: ServiceType.Cruise },
      relations: {
        cruise: true,
      },
    });
    if (!service) {
      throw new NotFoundException(`Cruise service with id ${id} not found`);
    }
    this.serviceRepository.merge(service, updateCruiseServiceDto.service);
    const cruise = service.cruise;
    this.cruiseRepository.merge(cruise, updateCruiseServiceDto.cruise);

    if (updateCruiseServiceDto.service.imageIds) {
      service.images = await this.galleryRepository.find({
        where: { id: In(updateCruiseServiceDto.service.imageIds) },
      });
    }

    return this.serviceRepository.save(service);
  }

  async softDeleteCruiseService(id: number): Promise<void> {
    const service = await this.serviceRepository.findOne({
      where: { id, type: ServiceType.Cruise },
    });
    if (!service) {
      throw new NotFoundException(`Cruise service with id ${id} not found`);
    }
    await this.serviceRepository.softDelete(service.id);
  }
}
