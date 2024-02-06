import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import {
  UpdateServiceDto,
  UpdateStandardPackageServiceDto,
} from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity, ServiceType } from './entities/service.entity';
import { In, Repository } from 'typeorm';
import { WholesalersService } from '../wholesalers/wholesalers.service';
import { FlightEntity } from '../flights/entities/flight.entity';
import { TransportationEntity } from '../transportations/entities/transportation.entity';
import { CruiseEntity } from '../cruises/entities/cruise.entity';
import { SafariEntity } from '../safari/entities/safari.entity';
import { GalleryEntity } from 'src/image-upload/entities/gallery.entity';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { StandardPackageEntity } from '../packages/entities/standard-package.entity';
import { CreateStandardPackageServiceDto } from './dto/create-standard-package-service.dto';
import { PackageDayEntity } from '../packages/entities/package-day.entity';
import { HotelRoomEntity } from '../hotel-rooms/entities/hotel-room.entity';

export type Service =
  | HotelRoomEntity
  | FlightEntity
  | TransportationEntity
  | SafariEntity
  | CruiseEntity
  | StandardPackageEntity;

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(ServiceEntity)
    private serviceRepository: Repository<ServiceEntity>,

    @InjectRepository(GalleryEntity)
    private galleryRepository: Repository<GalleryEntity>,
    @InjectRepository(StandardPackageEntity)
    private standardPackageRepository: Repository<StandardPackageEntity>,
    @InjectRepository(PackageDayEntity)
    private packageDayRepository: Repository<PackageDayEntity>,
    private wholesalerService: WholesalersService,
  ) {}

  async create(createServiceDto: CreateServiceDto): Promise<ServiceEntity> {
    if (!createServiceDto.WholesalerId) {
      throw new Error('Wholesaler ID is required');
    }

    const wholesaler = await this.wholesalerService.findOne(
      createServiceDto.WholesalerId,
    );

    if (!wholesaler) {
      throw new Error('Invalid wholesaler ID');
    }

    const service = this.serviceRepository.create(createServiceDto);
    service.wholesaler = wholesaler;

    return this.serviceRepository.save(service);
  }

  findAll(paginationOptions: IPaginationOptions) {
    return this.serviceRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<ServiceEntity> {
    const service = await this.serviceRepository.findOne({ where: { id } });
    if (!service) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }
    return service;
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    const existingService = await this.findOne(id);

    this.serviceRepository.merge(existingService, updateServiceDto);
    return this.serviceRepository.save(existingService);
  }

  async remove(id: number) {
    const service = await this.findOne(id);
    await this.serviceRepository.softDelete(service.id);
    return true;
  }

  async createService(
    createServiceDto: CreateServiceDto,
    serviceType: ServiceType,
    specificServiceRepository: Repository<Service>,
    specificServiceEntity: Service,
  ): Promise<ServiceEntity> {
    const service = this.serviceRepository.create(createServiceDto);
    service.type = serviceType;
    service.images = await this.galleryRepository.findBy({
      id: In(createServiceDto.imageIds),
    });

    if (!specificServiceEntity) {
      return this.serviceRepository.save(service);
    }
    if (specificServiceEntity instanceof HotelRoomEntity) {
      service.room = specificServiceEntity;
    } else if (specificServiceEntity instanceof FlightEntity) {
      service.flight = specificServiceEntity;
    } else if (specificServiceEntity instanceof TransportationEntity) {
      service.transportation = specificServiceEntity;
    } else if (specificServiceEntity instanceof SafariEntity) {
      service.safari = specificServiceEntity;
    } else if (specificServiceEntity instanceof CruiseEntity) {
      service.cruise = specificServiceEntity;
    } else if (specificServiceEntity instanceof StandardPackageEntity) {
      service.standardPackage = specificServiceEntity;
    }

    return this.serviceRepository.save(service);
  }

  async createStandardPackageService(
    createStandardPackageServiceDto: CreateStandardPackageServiceDto,
  ) {
    console.log(createStandardPackageServiceDto);
    const standardPackageService = this.standardPackageRepository.create(
      createStandardPackageServiceDto.standardPackage,
    );
    standardPackageService.packageDays = this.packageDayRepository.create(
      createStandardPackageServiceDto.standardPackage.packageDays,
    );
    await this.createService(
      createStandardPackageServiceDto.service,
      ServiceType.StandardPackage,
      this.standardPackageRepository,
      standardPackageService,
    );
  }

  async findAllServices(serviceType: ServiceType, relation: string) {
    const services = await this.serviceRepository.find({
      where: { type: serviceType },
      relations: [relation, 'images'],
      loadRelationIds: { relations: ['wholesaler'] },
      loadEagerRelations: true,
    });
    return services;
  }

  async findAllStandardPackageServices() {
    return this.findAllServices(ServiceType.StandardPackage, 'standardPackage');
  }

  async findAllTransportationServices() {
    return this.findAllServices(ServiceType.Transportation, 'transportation');
  }

  async findAllSafariServices() {
    return this.findAllServices(ServiceType.Safari, 'safari');
  }

  async findAllCruiseServices() {
    return this.findAllServices(ServiceType.Cruise, 'cruise');
  }

  async updateService(
    id: number,
    updateServiceDto: UpdateServiceDto,
    serviceType: ServiceType,
    specificServiceRepository: Repository<Service>,
    updateSpecificServiceDto: any,
  ): Promise<void> {
    // const service = await this.findOne(id);
    const service = await this.serviceRepository.findOne({
      where: { id },
      relations: ['images'],
    });
    if (!service) {
      throw new NotFoundException(`Service with id ${id} does not exist`);
    }
    const updatedService = this.serviceRepository.merge(
      service,
      updateServiceDto,
    );
    if (updateServiceDto.imageIds) {
      updatedService.images = await this.galleryRepository.find({
        where: { id: In(updateServiceDto.imageIds) },
      });
    }
    const entity = await specificServiceRepository.findOne({
      where: { service: { id: service.id } },
    });
    if (!entity) {
      throw new NotFoundException(
        `Service info for a service with id ${id} does not exist`,
      );
    }
    const updatedEntity = specificServiceRepository.merge(
      entity,
      updateSpecificServiceDto,
    );
    updatedEntity.service = updatedService;
    // updatedService[serviceType] = specificServiceRepository.merge(
    //   service[serviceType],
    //   updateSpecificServiceDto,
    // );

    await this.serviceRepository.save(updatedService);
    await specificServiceRepository.save(updatedEntity);
    // const entity = await specificServiceRepository.findOne({
    //   where: { service: service },
    // });
    // console.log(entity);
    // if (!entity) {
    //   throw new NotFoundException(
    //     `Service info for a service with id ${id} does not exist`,
    //   );
    // }
    // specificServiceRepository.merge(entity, updateSpecificServiceDto);
    // await specificServiceRepository.save(entity);
  }

  async updateStandardPackageService(
    id: number,
    updateStandardPackageServiceDto: UpdateStandardPackageServiceDto,
  ) {
    const service = await this.serviceRepository.findOne({
      where: { id },
      relations: {
        standardPackage: true,
      },
    });
    console.log(updateStandardPackageServiceDto.standardPackage.packageDays);
    if (!service) {
      throw new NotFoundException(`Service with id ${id} does not exist`);
    }
    if (service.standardPackage === null) {
      throw new NotFoundException(
        `Service info for a service with id ${id} does not exist`,
      );
    }
    const updatedService = this.serviceRepository.merge(
      service,
      updateStandardPackageServiceDto.service,
    );
    const updatedStandardPackage = this.standardPackageRepository.merge(
      service.standardPackage,
      updateStandardPackageServiceDto.standardPackage,
    );

    updatedService.standardPackage = updatedStandardPackage;
    return await this.serviceRepository.save(updatedService);
  }

  async findOneService(id: number, relation: string) {
    const service = await this.serviceRepository.findOne({
      where: { id },
      relations: ['images', relation],
    });
    if (!service) {
      throw new NotFoundException(`Service with id ${id} does not exist`);
    }
    return service;
  }
}
