import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelEntity } from './entities/hotel.entity';
import { Repository } from 'typeorm';
import {
  ServiceEntity,
  ServiceType,
} from '../services/entities/service.entity';
// import { RoomsService } from './hotel-rooms.service';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(HotelEntity)
    private readonly hotelRepository: Repository<HotelEntity>,
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,
  ) {}
  async create(createHotelDto: CreateHotelDto) {
    const service = await this.serviceRepository.findOne({
      where: { id: createHotelDto.ServiceId },
    });
    if (!service) {
      throw new NotFoundException(
        `Service with id ${createHotelDto.ServiceId} not found`,
      );
    }

    if (service.type !== ServiceType.Hotel) {
      throw new BadRequestException(
        `Service with id ${createHotelDto.ServiceId} is not a hotel`,
      );
    }
    const hotel = this.hotelRepository.create(createHotelDto);
    return this.hotelRepository.save(hotel);
  }

  findAll() {
    return this.hotelRepository.find();
  }

  async findOne(id: number) {
    const hotel = await this.hotelRepository.findOne({ where: { id } });
    if (!hotel) {
      throw new NotFoundException(`hotel with id ${id} not found`);
    }
    return hotel;
  }

  async update(id: number, updateHotelDto: UpdateHotelDto) {
    const existingHotel = await this.hotelRepository.findOne({
      where: { id },
    });
    if (!existingHotel) {
      throw new NotFoundException(`Hotel with id ${id} not found`);
    }
    if (updateHotelDto.ServiceId) {
      const service = await this.serviceRepository.findOne({
        where: { id: updateHotelDto.ServiceId },
      });
      if (!service) {
        throw new NotFoundException(
          `Service with id ${updateHotelDto.ServiceId} not found`,
        );
      }
      if (service.type !== ServiceType.Hotel) {
        throw new BadRequestException(
          `Service with id ${updateHotelDto.ServiceId} is not a hotel`,
        );
      }
    }
    await this.hotelRepository.update({ id }, updateHotelDto);
    return this.hotelRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    const result = await this.hotelRepository.update(id, {
      deletedAt: new Date(),
    });
    if (result.affected === 0) {
      throw new NotFoundException(`hotel with id ${id} not found`);
    }
  }
}
