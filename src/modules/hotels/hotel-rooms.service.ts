import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelEntity } from './entities/hotel.entity';
import { Repository } from 'typeorm';
import { ServiceEntity } from '../services/entities/service.entity';
import { RoomEntity } from './entities/room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { HotelsService } from './hotels.service';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(HotelEntity)
    private readonly hotelRepository: Repository<HotelEntity>,
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,
    private readonly hotelsService: HotelsService,
  ) {}
  async create(createRoomDto: CreateRoomDto) {
    const hotel = await this.hotelsService.findOne(createRoomDto.HotelId);
    if (!hotel) {
      throw new NotFoundException(
        `Hotel with id ${createRoomDto.HotelId} not found`,
      );
    }
  }

  //   const room = this.roomRepository.create(createRoomDto);
  //   return this.roomRepository.save(room);
  // }

  // findAll() {
  //   return this.roomRepository.find();
  // }

  // async findOne(id: number) {
  //   const room = await this.roomRepository.findOne({ where: { id } });
  //   if (!room) {
  //     throw new NotFoundException(`Room with id ${id} not found`);
  //   }
  //   return room;
  // }

  // async update(id: number, UpdateRoomDto: UpdateRoomDto) {
  //   const hotel = await this.hotelsService.findOne(UpdateRoomDto.HotelId);
  //   if (!hotel) {
  //     throw new NotFoundException(
  //       `Hotel with id ${UpdateRoomDto.HotelId} not found`,
  //     );
  //   }

  //   const room = await this.roomRepository.update(
  //     {
  //       id: id,
  //     },
  //     UpdateRoomDto,
  //   );
  //   if (!room) {
  //     throw new NotFoundException(`Room with id ${id} not found`);
  //   }
  // }

  async remove(id: number) {
    const result = await this.hotelRepository.update(id, {
      deletedAt: new Date(),
    });
    if (result.affected === 0) {
      throw new NotFoundException(`Room with id ${id} not found`);
    }
  }

  async getHotelRooms(hotelId: number) {
    const hotel = await this.hotelsService.findOne(hotelId);
    if (!hotel) {
      throw new NotFoundException(`Hotel with id ${hotelId} not found`);
    }
    return this.roomRepository.find({
      where: {
        hotel: {
          id: hotelId,
        },
      },
    });
  }

  async getHotelRoom(hotelId: number, roomId: number) {
    const hotel = await this.hotelsService.findOne(hotelId);
    if (!hotel) {
      throw new NotFoundException(`Hotel with id ${hotelId} not found`);
    }
    const room = await this.roomRepository.findOne({
      where: {
        id: roomId,
        hotel: {
          id: hotelId,
        },
      },
    });
    if (!room) {
      throw new NotFoundException(
        `Room with id ${roomId} not found or does not belong to hotel with id ${hotelId}`,
      );
    }
    return room;
  }

  async createHotelRoom(hotelId: number, createRoomDto: CreateRoomDto) {
    const hotel = await this.hotelsService.findOne(hotelId);
    if (!hotel) {
      throw new NotFoundException(`Hotel with id ${hotelId} not found`);
    }
    const room = this.roomRepository.create(createRoomDto);
    room.hotel = hotel;
    return this.roomRepository.save(room);
  }

  async updateHotelRoom(
    hotelId: number,
    roomId: number,
    updateRoomDto: UpdateRoomDto,
  ) {
    const hotel = await this.hotelsService.findOne(hotelId);
    if (!hotel) {
      throw new NotFoundException(`Hotel with id ${hotelId} not found`);
    }
    const room = await this.roomRepository.update(
      {
        id: roomId,
        hotel: {
          id: hotelId,
        },
      },
      updateRoomDto,
    );
    if (!room) {
      throw new NotFoundException(
        `Room with id ${roomId} not found or does not belong to hotel with id ${hotelId}`,
      );
    }
    return this.getHotelRoom(hotelId, roomId);
  }
}
