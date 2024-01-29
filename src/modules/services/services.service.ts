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
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { CreateSafariDto } from '../safari/dto/create-safari.dto';
import { CreateHotelRoomDto } from '../hotels/dto/create-room.dto';
import { CreateFlightDto } from '../flights/dto/create-flight.dto';
import { CreateTransportationDto } from '../transportations/dto/create-transportation.dto';
import { CreateCruiseDto } from '../cruises/dto/create-cruise.dto';

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
  /**
   * Creates a new service.
   *
   * @param createServiceDto The DTO containing the data for the new service
   * @returns A promise that resolves to the created service entity
   */
  async create(createServiceDto: CreateServiceDto): Promise<ServiceEntity> {
    // Validate wholesaler ID
    if (!createServiceDto.WholesalerId) {
      throw new Error('Wholesaler ID is required');
    }

    // Get wholesaler entity
    const wholesaler = await this.wholesalerService.findOne(
      createServiceDto.WholesalerId,
    );

    if (!wholesaler) {
      throw new Error('Invalid wholesaler ID');
    }

    // Create service entity
    const service = this.serviceRepository.create(createServiceDto);

    // Assign wholesaler
    service.wholesaler = wholesaler;

    // Save service
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
    specificServiceRepository: Repository<
      | RoomEntity
      | FlightEntity
      | TransportationEntity
      | SafariEntity
      | CruiseEntity
    >,
    // specificServiceDto:
    //   | CreateSafariDto
    //   | CreateHotelRoomDto
    //   | CreateFlightDto
    //   | CreateTransportationDto
    //   | CreateCruiseDto,
    specificServiceEntity:
      | RoomEntity
      | FlightEntity
      | TransportationEntity
      | SafariEntity
      | CruiseEntity,
  ): Promise<ServiceEntity> {
    const service = this.serviceRepository.create(createServiceDto);
    service.type = serviceType;

    service.images = await this.galleryRepository.findBy({
      id: In(createServiceDto.imageIds),
    });

    // const specificService =
    //   specificServiceRepository.create(specificServiceDto);
    // specificService.service = service;
    if (!specificServiceEntity) {
      return this.serviceRepository.save(service);
    }
    if (specificServiceEntity instanceof RoomEntity) {
      service.room = specificServiceEntity;
    } else if (specificServiceEntity instanceof FlightEntity) {
      service.flight = specificServiceEntity;
    } else if (specificServiceEntity instanceof TransportationEntity) {
      service.transportation = specificServiceEntity;
    } else if (specificServiceEntity instanceof SafariEntity) {
      service.safari = specificServiceEntity;
    } else if (specificServiceEntity instanceof CruiseEntity) {
      service.cruise = specificServiceEntity;
    }

    return this.serviceRepository.save(service);
  }

  async createHotelRoomService(
    createHotelRoomServiceDto: CreateHotelRoomServiceDto,
  ) {
    const hotel = await this.hotelsService.findOne(
      createHotelRoomServiceDto.room.HotelId,
    );
    const roomService = this.roomRepository.create(
      createHotelRoomServiceDto.room,
    );
    roomService.hotel = hotel;

    await this.createService(
      createHotelRoomServiceDto.service,
      ServiceType.HotelRooms,
      this.roomRepository,
      roomService,
    );
  }

  async createFlightService(createFlightServiceDto: CreateFlightServiceDto) {
    const flightService = this.flightRepository.create(
      createFlightServiceDto.flight,
    );
    await this.createService(
      createFlightServiceDto.service,
      ServiceType.FlightSeats,
      this.flightRepository,
      flightService,
    );
  }

  async createTransportationService(
    createTransportationServiceDto: CreateTransportationServiceDto,
  ) {
    const transportationService = this.transportationRepository.create(
      createTransportationServiceDto.transportation,
    );
    await this.createService(
      createTransportationServiceDto.service,
      ServiceType.Transportation,
      this.transportationRepository,
      transportationService,
    );
  }

  async createSafariService(createSafariServiceDto: CreateSafariServiceDto) {
    const safariService = this.safariRepository.create(
      createSafariServiceDto.safari,
    );
    await this.createService(
      createSafariServiceDto.service,
      ServiceType.Safari,
      this.safariRepository,
      safariService,
    );
  }

  async createCruiseService(createCruiseServiceDto: CreateCruiseServiceDto) {
    const cruiseService = this.cruiseRepository.create(
      createCruiseServiceDto.cruise,
    );
    await this.createService(
      createCruiseServiceDto.service,
      ServiceType.Cruise,
      this.cruiseRepository,
      cruiseService,
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
