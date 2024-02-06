import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStandardPackageServiceDto } from './dto/create-standard-package.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GalleryEntity } from 'src/image-upload/entities/gallery.entity';
import { PackageDayEntity } from './entities/standard-package-day.entity';
import { StandardPackageEntity } from './entities/standard-package.entity';
import {
  ServiceEntity,
  ServiceType,
} from '../services/entities/service.entity';
import { In, Repository } from 'typeorm';
import { UpdateStandardPackageServiceDto } from './dto/update-standard-package.dto';

@Injectable()
export class StandardPackagesService {
  constructor(
    @InjectRepository(StandardPackageEntity)
    private readonly standardPackageRepository: Repository<StandardPackageEntity>,
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,
    @InjectRepository(PackageDayEntity)
    private readonly packageDayRepository: Repository<PackageDayEntity>,
    @InjectRepository(GalleryEntity)
    private readonly galleryRepository: Repository<GalleryEntity>,
  ) {}
  async createStandardPackageService(
    createStandardPackageServiceDto: CreateStandardPackageServiceDto,
  ): Promise<ServiceEntity> {
    const service = this.serviceRepository.create(
      createStandardPackageServiceDto.service,
    );
    const standardPackage = this.standardPackageRepository.create(
      createStandardPackageServiceDto.standardPackage,
    );
    service.standardPackage = standardPackage;
    service.type = ServiceType.StandardPackage;
    if (createStandardPackageServiceDto.service.imageIds) {
      const images = await this.galleryRepository.find({
        where: {
          id: In(createStandardPackageServiceDto.service.imageIds),
        },
      });
      service.images = images;
    }
    return this.serviceRepository.save(service);
  }

  findAllStandardPackageServices(): Promise<ServiceEntity[]> {
    return this.serviceRepository.find({
      where: { type: ServiceType.StandardPackage },
      relations: {
        standardPackage: true,
      },
    });
  }

  async findOneStandardPackageService(id: number) {
    const standardPackage = await this.serviceRepository.findOne({
      where: { id },
      relations: {
        standardPackage: true,
      },
    });
    if (!standardPackage) {
      throw new NotFoundException(`StandardPackage with id ${id} not found`);
    }
    return standardPackage;
  }

  async updateStandardPackageService(
    id: number,
    updateStandardPackageServiceDto: UpdateStandardPackageServiceDto,
  ): Promise<ServiceEntity> {
    const service = await this.serviceRepository.findOne({
      where: { id, type: ServiceType.StandardPackage },
      relations: {
        standardPackage: true,
      },
    });
    if (!service) {
      throw new NotFoundException(
        `StandardPackage service with id ${id} not found`,
      );
    }
    this.serviceRepository.merge(
      service,
      updateStandardPackageServiceDto.service,
    );
    const standardPackage = service.standardPackage;
    if (updateStandardPackageServiceDto.standardPackage.packageDays) {
      const newPackageDays = this.packageDayRepository.create(
        updateStandardPackageServiceDto.standardPackage.packageDays,
      );
      standardPackage.packageDays = newPackageDays;
    }

    this.standardPackageRepository.merge(
      standardPackage,
      updateStandardPackageServiceDto.standardPackage,
    );

    if (updateStandardPackageServiceDto.service.imageIds) {
      service.images = await this.galleryRepository.find({
        where: { id: In(updateStandardPackageServiceDto.service.imageIds) },
      });
    }

    return this.serviceRepository.save(service);
  }

  async softDeleteStandardPackageService(id: number): Promise<void> {
    const service = await this.serviceRepository.findOne({
      where: { id, type: ServiceType.StandardPackage },
    });
    if (!service) {
      throw new NotFoundException(
        `StandardPackage service with id ${id} not found`,
      );
    }
    await this.serviceRepository.softDelete(service.id);
  }
}
