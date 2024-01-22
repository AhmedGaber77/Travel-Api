import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelEntity } from './entities/hotel.entity';
import { Repository } from 'typeorm';
import {} from '../services/entities/service.entity';
// import { RoomsService } from './hotel-rooms.service';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(HotelEntity)
    private readonly hotelRepository: Repository<HotelEntity>,
  ) {}
  async create(createHotelDto: CreateHotelDto) {
    const hotel = this.hotelRepository.create(createHotelDto);
    return this.hotelRepository.save(hotel);
  }

  findAll() {
    return this.hotelRepository.find();
  }

  async findOne(id: number) {
    const hotel = await this.hotelRepository.findOne({ where: { id } });
    if (!hotel) {
      throw new NotFoundException(`Hotel with id ${id} not found`);
    }
    return hotel;
  }

  async update(id: number, updateHotelDto: UpdateHotelDto) {
    const existingHotel = await this.findOne(id);
    this.hotelRepository.merge(existingHotel, updateHotelDto);
    return this.hotelRepository.save(existingHotel);
  }

  async remove(id: number) {
    const hotel = await this.findOne(id);
    await this.hotelRepository.softDelete(hotel.id);
    return true;
  }
}
