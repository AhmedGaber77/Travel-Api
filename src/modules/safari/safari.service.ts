import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateSafariServiceDto } from './dto/update-safari.dto';
import { SafariEntity } from './entities/safari.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSafariServiceDto } from './dto/create-safari.dto';
import {
  ServiceEntity,
  ServiceType,
} from '../services/entities/service.entity';
import { GalleryEntity } from 'src/image-upload/entities/gallery.entity';

@Injectable()
export class SafariService {
  constructor(
    @InjectRepository(SafariEntity)
    private readonly safariRepository: Repository<SafariEntity>,
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,
    @InjectRepository(GalleryEntity)
    private readonly galleryRepository: Repository<GalleryEntity>,
  ) {}
  async createSafariService(
    createSafariServiceDto: CreateSafariServiceDto,
  ): Promise<ServiceEntity> {
    const service = this.serviceRepository.create(
      createSafariServiceDto.service,
    );
    const safari = this.safariRepository.create(createSafariServiceDto.safari);
    service.safari = safari;
    service.type = ServiceType.Safari;
    if (createSafariServiceDto.service.imageIds) {
      const images = await this.galleryRepository.find({
        where: {
          id: In(createSafariServiceDto.service.imageIds),
        },
      });
      service.images = images;
    }
    return this.serviceRepository.save(service);
  }

  findAllSafariServices(): Promise<ServiceEntity[]> {
    return this.serviceRepository.find({
      where: { type: ServiceType.Safari },
      relations: {
        safari: true,
      },
    });
  }

  async findOneSafariService(id: number) {
    const safari = await this.serviceRepository.findOne({
      where: { id },
      relations: {
        safari: true,
      },
    });
    if (!safari) {
      throw new NotFoundException(`Safari with id ${id} not found`);
    }
    return safari;
  }

  async updateSafariService(
    id: number,
    updateSafariServiceDto: UpdateSafariServiceDto,
  ): Promise<ServiceEntity> {
    const service = await this.serviceRepository.findOne({
      where: { id, type: ServiceType.Safari },
      relations: {
        safari: true,
      },
    });
    if (!service) {
      throw new NotFoundException(`Safari service with id ${id} not found`);
    }
    this.serviceRepository.merge(service, updateSafariServiceDto.service);
    const safari = service.safari;
    this.safariRepository.merge(safari, updateSafariServiceDto.safari);

    if (updateSafariServiceDto.service.imageIds) {
      service.images = await this.galleryRepository.find({
        where: { id: In(updateSafariServiceDto.service.imageIds) },
      });
    }

    return this.serviceRepository.save(service);
  }

  async softDeleteSafariService(id: number): Promise<void> {
    const service = await this.serviceRepository.findOne({
      where: { id, type: ServiceType.Safari },
    });
    if (!service) {
      throw new NotFoundException(`Safari service with id ${id} not found`);
    }
    await this.serviceRepository.softDelete(service.id);
  }
}
