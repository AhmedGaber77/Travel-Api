import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import {
  UpdateCruiseServiceDto,
  UpdateFlightServiceDto,
  UpdateHotelRoomServiceDto,
  UpdateSafariServiceDto,
  UpdateServiceDto,
  UpdateTransportationServiceDto,
} from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity, ServiceType } from './entities/service.entity';
import { DeepPartial, In, Repository } from 'typeorm';
import { WholesalersService } from '../wholesalers/wholesalers.service';
import { CreateHotelRoomServiceDto } from './dto/create-hotel-room.dto';
import { HotelsService } from '../hotels/hotels.service';
import { RoomEntity } from '../hotels/entities/room.entity';
import { CreateFlightServiceDto } from './dto/create-flight-service.dto';
import { FlightEntity } from '../flights/entities/flight.entity';
import { CreateTransportationServiceDto } from './dto/create-transportation-service.dto';
import { TransportationEntity } from '../transportations/entities/transportation.entity';
import { CruiseEntity } from '../cruises/entities/cruise.entity';
import { SafariEntity } from '../safari/entities/safari.entity';
import { CreateCruiseServiceDto } from './dto/create-cruise-service.dto';
import { CreateSafariServiceDto } from './dto/create-safari-service.dto';
import { GalleryEntity } from 'src/image-upload/entities/gallery.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(ServiceEntity)
    private serviceRepository: Repository<ServiceEntity>,
    @InjectRepository(RoomEntity)
    private roomRepository: Repository<RoomEntity>,
    @InjectRepository(FlightEntity)
    private flightRepository: Repository<FlightEntity>,
    @InjectRepository(TransportationEntity)
    private transportationRepository: Repository<TransportationEntity>,
    @InjectRepository(SafariEntity)
    private safariRepository: Repository<SafariEntity>,
    @InjectRepository(CruiseEntity)
    private cruiseRepository: Repository<CruiseEntity>,
    @InjectRepository(GalleryEntity)
    private galleryRepository: Repository<GalleryEntity>,
    private wholesalerService: WholesalersService,
    private readonly hotelsService: HotelsService,
  ) {}
  async create(createServiceDto: CreateServiceDto): Promise<ServiceEntity> {
    const wholesaler = await this.wholesalerService.findOne(
      createServiceDto.WholesalerId,
    );
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

  async createService<T>(
    createServiceDto: CreateServiceDto,
    serviceType: ServiceType,
    repository: Repository<any>,
    entityData: DeepPartial<T>,
  ): Promise<void> {
    const service = this.serviceRepository.create(createServiceDto);
    service.type = serviceType;
    const entity = repository.create(entityData);
    (entity as any).service = service;
    if (serviceType === ServiceType.HotelRooms) {
      service.room = entity;
      (entity as any).hotel = (entityData as any).hotel;
    } else if (serviceType === ServiceType.FlightSeats) {
      service.flight = entity;
    } else if (serviceType === ServiceType.Transportation) {
      service.transportation = entity;
    } else if (serviceType === ServiceType.Safari) {
      service.safari = entity;
    } else if (serviceType === ServiceType.Cruise) {
      service.cruise = entity;
    }
    console.log(createServiceDto.imageIds);

    service.images = await this.galleryRepository.findBy({
      id: In(createServiceDto.imageIds),
    });
    await this.serviceRepository.save(service);
  }

  async createHotelRoomService(
    createHotelRoomServiceDto: CreateHotelRoomServiceDto,
  ) {
    const hotel = await this.hotelsService.findOne(
      createHotelRoomServiceDto.HotelId,
    );
    await this.createService(
      createHotelRoomServiceDto.service,
      ServiceType.HotelRooms,
      this.roomRepository,
      { ...createHotelRoomServiceDto.room, hotel },
    );
  }

  async createFlightService(createFlightServiceDto: CreateFlightServiceDto) {
    await this.createService(
      createFlightServiceDto.service,
      ServiceType.FlightSeats,
      this.flightRepository,
      createFlightServiceDto.flight,
    );
  }

  async createTransportationService(
    createTransportationServiceDto: CreateTransportationServiceDto,
  ) {
    await this.createService(
      createTransportationServiceDto.service,
      ServiceType.Transportation,
      this.transportationRepository,
      createTransportationServiceDto.transportation,
    );
  }

  async createSafariService(createSafariServiceDto: CreateSafariServiceDto) {
    await this.createService(
      createSafariServiceDto.service,
      ServiceType.Safari,
      this.safariRepository,
      createSafariServiceDto.safari,
    );
  }

  async createCruiseService(createCruiseServiceDto: CreateCruiseServiceDto) {
    await this.createService(
      createCruiseServiceDto.service,
      ServiceType.Cruise,
      this.cruiseRepository,
      createCruiseServiceDto.cruise,
    );
  }

  async findAllServices(serviceType: ServiceType, relation: string) {
    const services = await this.serviceRepository.find({
      where: { type: serviceType },
      relations: [relation, 'images'],
    });
    return services;
  }

  async findAllHotelRoomServices() {
    return this.findAllServices(ServiceType.HotelRooms, 'room');
  }

  async findAllFlightServices() {
    return this.findAllServices(ServiceType.FlightSeats, 'flight');
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

  async updateService<T>(
    id: number,
    updateServiceDto: any,
    serviceType: ServiceType,
    repository: Repository<any>,
    entityData: DeepPartial<T>,
  ): Promise<void> {
    const service = await this.findOne(id);
    this.serviceRepository.merge(service, updateServiceDto);
    await this.serviceRepository.save(service);
    const entity = await repository.findOne({
      where: { service: service.id },
    });

    repository.merge(entity, entityData as any);
    await repository.save(entity);
  }

  async updateHotelRoomService(
    id: number,
    updateHotelRoomServiceDto: UpdateHotelRoomServiceDto,
  ) {
    await this.updateService(
      id,
      updateHotelRoomServiceDto.service,
      ServiceType.HotelRooms,
      this.roomRepository,
      {
        ...updateHotelRoomServiceDto.room,
      },
    );
  }

  async updateFlightService(
    id: number,
    updateFlightServiceDto: UpdateFlightServiceDto,
  ) {
    await this.updateService(
      id,
      updateFlightServiceDto.service,
      ServiceType.FlightSeats,
      this.flightRepository,
      updateFlightServiceDto.flight,
    );
  }

  async updateTransportationService(
    id: number,
    updateTransportationServiceDto: UpdateTransportationServiceDto,
  ) {
    await this.updateService(
      id,
      updateTransportationServiceDto.service,
      ServiceType.Transportation,
      this.transportationRepository,
      updateTransportationServiceDto.transportation,
    );
  }

  async updateSafariService(
    id: number,
    updateSafariServiceDto: UpdateSafariServiceDto,
  ) {
    await this.updateService(
      id,
      updateSafariServiceDto.service,
      ServiceType.Safari,
      this.safariRepository,
      updateSafariServiceDto.safari,
    );
  }

  async updateCruiseService(
    id: number,
    updateCruiseServiceDto: UpdateCruiseServiceDto,
  ) {
    await this.updateService(
      id,
      updateCruiseServiceDto.service,
      ServiceType.Cruise,
      this.cruiseRepository,
      updateCruiseServiceDto.cruise,
    );
  }
}
