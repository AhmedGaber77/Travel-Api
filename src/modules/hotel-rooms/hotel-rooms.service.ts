import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import {
  ServiceEntity,
  ServiceType,
} from '../services/entities/service.entity';
import { HotelRoomEntity } from './entities/hotel-room.entity';

import { HotelEntity } from '../hotels/entities/hotel.entity';
import { CreateHotelRoomServiceDto } from './dto/create-hotel-room.dto';
import { UpdateHotelRoomServiceDto } from './dto/update-hotel-room.dto';
import { GalleryEntity } from 'src/image-upload/entities/gallery.entity';

@Injectable()
export class HotelRoomsService {
  constructor(
    @InjectRepository(HotelEntity)
    private readonly hotelRepository: Repository<HotelEntity>,
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,
    @InjectRepository(HotelRoomEntity)
    private readonly roomRepository: Repository<HotelRoomEntity>,
    @InjectRepository(GalleryEntity)
    private readonly galleryRepository: Repository<GalleryEntity>,
  ) {}

  async createHotelRoomService(
    createHotelRoomServiceDto: CreateHotelRoomServiceDto,
  ): Promise<ServiceEntity> {
    const service = this.serviceRepository.create(
      createHotelRoomServiceDto.service,
    );
    const room = this.roomRepository.create(createHotelRoomServiceDto.room);
    const hotel = await this.hotelRepository.findOne({
      where: { id: createHotelRoomServiceDto.room.hotelId },
    });
    if (!hotel) {
      throw new NotFoundException(
        `Hotel with id ${createHotelRoomServiceDto.room.hotelId} not found`,
      );
    }
    room.hotel = hotel;
    service.room = room;
    return await this.serviceRepository.save(service);
  }

  async findAllHotelRoomServices(): Promise<ServiceEntity[]> {
    return await this.serviceRepository.find({
      where: {
        type: ServiceType.HotelRoom,
      },
      relations: {
        room: true,
      },
    });
  }

  async findOneHotelRoomService(id: number): Promise<ServiceEntity> {
    const service = await this.serviceRepository.findOne({
      where: {
        id,
        type: ServiceType.HotelRoom,
      },
      relations: {
        room: true,
      },
    });
    if (!service) {
      throw new NotFoundException(`Hotel room service with id ${id} not found`);
    }
    return service;
  }

  async updateHotelRoomService(
    id: number,
    updateHotelRoomServiceDto: UpdateHotelRoomServiceDto,
  ): Promise<ServiceEntity> {
    console.log(id);
    console.log(updateHotelRoomServiceDto);
    const service = await this.serviceRepository.findOne({
      where: { id },
      relations: { room: true },
    });
    if (!service) {
      throw new NotFoundException(`Hotel room service with id ${id} not found`);
    }
    this.serviceRepository.merge(service, updateHotelRoomServiceDto.service);

    const room = service.room;
    this.roomRepository.merge(room, updateHotelRoomServiceDto.room);

    if (updateHotelRoomServiceDto.service.imageIds) {
      service.images = await this.galleryRepository.find({
        where: { id: In(updateHotelRoomServiceDto.service.imageIds) },
      });
    }
    return await this.serviceRepository.save(service);
  }

  async softDeleteHotelRoomService(id: number): Promise<void> {
    const service = await this.serviceRepository.findOne({
      where: { id, type: ServiceType.HotelRoom },
    });
    if (!service) {
      throw new NotFoundException(`Hotel room service with id ${id} not found`);
    }
    await this.serviceRepository.softDelete(service.id);
  }
}
