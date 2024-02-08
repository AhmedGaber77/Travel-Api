import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ServiceEntity,
  ServiceType,
} from 'src/modules/services/entities/service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceSeedService {
  constructor(
    @InjectRepository(ServiceEntity)
    private serviceRepository: Repository<ServiceEntity>,
  ) {}

  async run() {
    let count = await this.serviceRepository.count({
      where: {
        type: ServiceType.FlightSeat,
      },
    });
    if (!count) {
      const flight = this.serviceRepository.create({
        name: 'Service 1',
        type: ServiceType.FlightSeat,
        price: 100,
        description: 'Service 1 description',
        quantityAvailable: 10,
        savings: 10,
        isOffer: true,
        flight: {
          airline: 'Airline 1',
          seatType: 'Seat type 1',
          departureAddress: 'Departure address 1',
          arrivalAddress: 'Arrival address 1',
          departureTime: new Date(),
          arrivalTime: new Date(),
          departureCity: 'Departure city 1',
          arrivalCity: 'Arrival city 1',
        },
        images: [
          {
            imageUrl:
              'http://res.cloudinary.com/dohqjoraz/image/upload/v1707328670/dfwt9zpd0e89my56zrkd.jpg',
          },
        ],
      });
      await this.serviceRepository.save(flight);
    }

    count = await this.serviceRepository.count({
      where: {
        type: ServiceType.HotelRoom,
      },
    });

    if (!count) {
      const hotelRoom = this.serviceRepository.create({
        name: 'Service 2',
        type: ServiceType.HotelRoom,
        price: 100,
        description: 'Service 2 description',
        quantityAvailable: 10,
        savings: 10,
        isOffer: true,
        room: {
          type: 'Deluxe',
          roomArea: 120,
          numberOfBeds: 1,
          numberOfSleeps: 1,
          hotelId: 1,
        },
        images: [
          {
            imageUrl:
              'http://res.cloudinary.com/dohqjoraz/image/upload/v1707328670/dfwt9zpd0e89my56zrkd.jpg',
          },
        ],
      });

      await this.serviceRepository.save(hotelRoom);
    }

    count = await this.serviceRepository.count({
      where: {
        type: ServiceType.Safari,
      },
    });

    if (!count) {
      const hotelRoom = this.serviceRepository.create({
        name: 'Service 3',
        type: ServiceType.Safari,
        price: 100,
        description: 'Service 3 description',
        quantityAvailable: 10,
        savings: 10,
        isOffer: true,
        safari: {
          includes: 'All the things',
          excludes: 'Nothing',
          days: 1,
          startTime: '2022-01-01T00:00:00.000Z',
          endTime: '2022-01-01T00:00:00.000Z',
          city: 'Paris',
          country: 'France',
          address: '1234 Main St',
        },
        images: [
          {
            imageUrl:
              'http://res.cloudinary.com/dohqjoraz/image/upload/v1707328670/dfwt9zpd0e89my56zrkd.jpg',
          },
        ],
      });

      await this.serviceRepository.save(hotelRoom);
    }

    count = await this.serviceRepository.count({
      where: {
        type: ServiceType.Cruise,
      },
    });
    if (!count) {
      const cruise = this.serviceRepository.create({
        name: 'Service 4',
        type: ServiceType.Cruise,
        price: 100,
        description: 'Service 4 description',
        quantityAvailable: 10,
        savings: 10,
        isOffer: true,
        cruise: {
          depratureCity: 'New York',
          depratureCountry: 'United States',
          depratureAddress: '1234 Main St',
          depratureTime: '2022-01-01T00:00:00.000Z',
          endTime: '2022-01-01T00:00:00.000Z',
          cabinType: 'Business',
        },
        images: [
          {
            imageUrl:
              'http://res.cloudinary.com/dohqjoraz/image/upload/v1707328670/dfwt9zpd0e89my56zrkd.jpg',
          },
        ],
      });
      await this.serviceRepository.save(cruise);
    }

    count = await this.serviceRepository.count({
      where: {
        type: ServiceType.Transportation,
      },
    });

    if (!count) {
      const transportation = this.serviceRepository.create({
        name: 'Service 5',
        type: ServiceType.Transportation,
        price: 100,
        description: 'Service 5 description',
        quantityAvailable: 10,
        savings: 10,
        isOffer: true,
        transportation: {
          type: 'car',
          description: 'Car rental',
          departureAddress: '1234 Main St',
          arrivalAddress: '1234 Main St',
          departureTime: '2022-01-01T00:00:00.000Z',
          arrivalTime: '2022-01-01T00:00:00.000Z',
          departingDate: '2022-01-01T00:00:00.000Z',
          returningDate: '2022-01-01T00:00:00.000Z',
        },
        images: [
          {
            imageUrl:
              'http://res.cloudinary.com/dohqjoraz/image/upload/v1707328670/dfwt9zpd0e89my56zrkd.jpg',
          },
        ],
      });
      await this.serviceRepository.save(transportation);
    }
  }
}
