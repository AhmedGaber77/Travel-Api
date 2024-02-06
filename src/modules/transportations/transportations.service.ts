import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransportationEntity } from './entities/transportation.entity';
import { In, Repository } from 'typeorm';
import { GalleryEntity } from 'src/image-upload/entities/gallery.entity';
import {
  ServiceEntity,
  ServiceType,
} from '../services/entities/service.entity';
import { CreateTransportationServiceDto } from './dto/create-transportation.dto';
import { UpdateTransportationServiceDto } from './dto/update-transportation.dto';

@Injectable()
export class TransportationsService {
  constructor(
    @InjectRepository(TransportationEntity)
    private transportationRepository: Repository<TransportationEntity>,
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,
    @InjectRepository(GalleryEntity)
    private readonly galleryRepository: Repository<GalleryEntity>,
  ) {}
  async createTransportationService(
    createTransportationServiceDto: CreateTransportationServiceDto,
  ): Promise<ServiceEntity> {
    const service = this.serviceRepository.create(
      createTransportationServiceDto.service,
    );
    const transportation = this.transportationRepository.create(
      createTransportationServiceDto.transportation,
    );
    service.transportation = transportation;
    service.type = ServiceType.Transportation;
    if (createTransportationServiceDto.service.imageIds) {
      const images = await this.galleryRepository.find({
        where: {
          id: In(createTransportationServiceDto.service.imageIds),
        },
      });
      service.images = images;
    }
    return this.serviceRepository.save(service);
  }

  findAllTransportationServices(): Promise<ServiceEntity[]> {
    return this.serviceRepository.find({
      where: { type: ServiceType.Transportation },
      relations: {
        transportation: true,
      },
    });
  }

  async findOneTransportationService(id: number) {
    const transportation = await this.serviceRepository.findOne({
      where: { id },
      relations: {
        transportation: true,
      },
    });
    if (!transportation) {
      throw new NotFoundException(`Transportation with id ${id} not found`);
    }
    return transportation;
  }

  async updateTransportationService(
    id: number,
    updateTransportationServiceDto: UpdateTransportationServiceDto,
  ): Promise<ServiceEntity> {
    const service = await this.serviceRepository.findOne({
      where: { id, type: ServiceType.Transportation },
      relations: {
        transportation: true,
      },
    });
    if (!service) {
      throw new NotFoundException(
        `Transportation service with id ${id} not found`,
      );
    }
    this.serviceRepository.merge(
      service,
      updateTransportationServiceDto.service,
    );
    const transportation = service.transportation;
    this.transportationRepository.merge(
      transportation,
      updateTransportationServiceDto.transportation,
    );

    if (updateTransportationServiceDto.service.imageIds) {
      service.images = await this.galleryRepository.find({
        where: { id: In(updateTransportationServiceDto.service.imageIds) },
      });
    }

    return this.serviceRepository.save(service);
  }

  async softDeleteTransportationService(id: number): Promise<void> {
    const service = await this.serviceRepository.findOne({
      where: { id, type: ServiceType.Transportation },
    });
    if (!service) {
      throw new NotFoundException(
        `Transportation service with id ${id} not found`,
      );
    }
    await this.serviceRepository.softDelete(service.id);
  }
}
