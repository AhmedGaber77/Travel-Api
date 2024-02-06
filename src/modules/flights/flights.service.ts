import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateFlightServiceDto } from './dto/update-flight.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FlightEntity } from './entities/flight.entity';
import { In, Repository } from 'typeorm';
import { CreateFlightServiceDto } from './dto/create-flight.dto';
import {
  ServiceEntity,
  ServiceType,
} from '../services/entities/service.entity';
import { GalleryEntity } from 'src/image-upload/entities/gallery.entity';

@Injectable()
export class FlightsService {
  constructor(
    @InjectRepository(FlightEntity)
    private readonly flightRepository: Repository<FlightEntity>,
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,
    @InjectRepository(GalleryEntity)
    private readonly galleryRepository: Repository<GalleryEntity>,
  ) {}
  async createFlightService(
    createFlightServiceDto: CreateFlightServiceDto,
  ): Promise<ServiceEntity> {
    const service = this.serviceRepository.create(
      createFlightServiceDto.service,
    );
    const flight = this.flightRepository.create(createFlightServiceDto.flight);
    service.flight = flight;
    service.type = ServiceType.FlightSeat;
    if (createFlightServiceDto.service.imageIds) {
      const images = await this.galleryRepository.find({
        where: {
          id: In(createFlightServiceDto.service.imageIds),
        },
      });
      service.images = images;
    }
    return this.serviceRepository.save(service);
  }

  findAllFlightServices(): Promise<ServiceEntity[]> {
    return this.serviceRepository.find({
      where: { type: ServiceType.FlightSeat },
      relations: {
        flight: true,
      },
    });
  }

  async findOneFlightService(id: number): Promise<ServiceEntity> {
    const flight = await this.serviceRepository.findOne({
      where: { id, type: ServiceType.FlightSeat },
      relations: {
        flight: true,
      },
    });
    if (!flight) {
      throw new NotFoundException(`Flight with id ${id} not found`);
    }
    return flight;
  }

  async updateFlightService(
    id: number,
    updateFlightServiceDto: UpdateFlightServiceDto,
  ): Promise<ServiceEntity> {
    const service = await this.serviceRepository.findOne({
      where: { id, type: ServiceType.FlightSeat },
      relations: {
        flight: true,
      },
    });
    if (!service) {
      throw new NotFoundException(`Flight service with id ${id} not found`);
    }
    this.serviceRepository.merge(service, updateFlightServiceDto.service);
    const flight = service.flight;
    this.flightRepository.merge(flight, updateFlightServiceDto.flight);

    if (updateFlightServiceDto.service.imageIds) {
      service.images = await this.galleryRepository.find({
        where: { id: In(updateFlightServiceDto.service.imageIds) },
      });
    }

    return this.serviceRepository.save(service);
  }

  async softDeleteFlightService(id: number): Promise<void> {
    const service = await this.serviceRepository.findOne({
      where: { id, type: ServiceType.FlightSeat },
    });
    if (!service) {
      throw new NotFoundException(`Flight service with id ${id} not found`);
    }
    await this.serviceRepository.softDelete(service.id);
  }
}
