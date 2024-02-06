import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelEntity } from './entities/hotel.entity';
import { Repository } from 'typeorm';
import {} from '../services/entities/service.entity';
import { HotelRoomEntity } from '../hotel-rooms/entities/hotel-room.entity';
import { UpdateHotelRoomDto } from '../hotel-rooms/dto/update-hotel-room.dto';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(HotelEntity)
    private readonly hotelRepository: Repository<HotelEntity>,
    @InjectRepository(HotelRoomEntity)
    private readonly roomRepository: Repository<HotelRoomEntity>,
  ) {}
  async create(createHotelDto: CreateHotelDto) {
    const hotel = this.hotelRepository.create(createHotelDto);
    return this.hotelRepository.save(hotel);
  }

  async findAllHotels(): Promise<HotelEntity[]> {
    return this.hotelRepository.find();
  }

  async findOneHotel(id: number): Promise<HotelEntity> {
    const hotel = await this.hotelRepository.findOne({ where: { id } });
    if (!hotel) {
      throw new NotFoundException(`Hotel with id ${id} not found`);
    }
    return hotel;
  }

  async updateHotel(
    id: number,
    updateHotelDto: UpdateHotelDto,
  ): Promise<HotelEntity> {
    const existingHotel = await this.findOneHotel(id);
    this.hotelRepository.merge(existingHotel, updateHotelDto);
    return this.hotelRepository.save(existingHotel);
  }

  async softDeleteHotel(id: number) {
    const hotel = await this.hotelRepository.softDelete({ id });
    if (!hotel) {
      throw new NotFoundException(`Hotel with id ${id} not found`);
    }
    return true;
  }

  async findManyHotelRoomsbyHotelId(
    hotelId: number,
  ): Promise<HotelRoomEntity[]> {
    const rooms = await this.roomRepository.find({
      where: { hotel: { id: hotelId } },
      relations: {
        service: true,
      },
    });
    if (!rooms) {
      throw new NotFoundException(`Hotel with id ${hotelId} not found`);
    }
    return rooms;
  }

  async findOneHotelRoombyHotelId(
    hotelId: number,
    roomId: number,
  ): Promise<HotelRoomEntity> {
    const room = await this.roomRepository.findOne({
      where: { id: roomId, hotel: { id: hotelId } },
      relations: {
        service: true,
        hotel: true,
      },
    });

    if (!room) {
      throw new NotFoundException(
        `Hotel with id ${hotelId} not found or room with id ${roomId} not found`,
      );
    }
    return room;
  }

  async updateHotelRoombyHotelId(
    hotelId: number,
    roomId: number,
    updateHotelRoomDto: UpdateHotelRoomDto,
  ): Promise<HotelRoomEntity> {
    const room = await this.roomRepository.findOne({
      where: { id: roomId, hotel: { id: hotelId } },
    });
    if (!room) {
      throw new NotFoundException(
        `Hotel with id ${hotelId} not found or room with id ${roomId} not found`,
      );
    }
    const updatedRoom = this.roomRepository.merge(room, updateHotelRoomDto);
    return this.roomRepository.save(updatedRoom);
  }

  async softDeleteHotelRoombyHotelId(
    hotelId: number,
    roomId: number,
  ): Promise<void> {
    const room = await this.roomRepository.findOne({
      where: { id: roomId, hotel: { id: hotelId } },
    });
    if (!room) {
      throw new NotFoundException(
        `Hotel with id ${hotelId} not found or room with id ${roomId} not found`,
      );
    }
    await this.roomRepository.softDelete({ id: roomId });
  }
}
