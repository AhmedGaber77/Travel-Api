import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelEntity } from 'src/modules/hotels/entities/hotel.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HotelSeedService {
  constructor(
    @InjectRepository(HotelEntity)
    private hotelReopsitory: Repository<HotelEntity>,
  ) {}
  async run() {
    const count = await this.hotelReopsitory.count({
      where: {
        name: 'Hotel 1',
      },
    });
    if (!count) {
      const hotel = this.hotelReopsitory.create({
        name: 'ABC Hotel',
        address: '123 ABC Street',
        city: 'ABC City',
        state: 'AB',
        zipCode: '12345',
        mobileNumber: '+1234567890',
        phoneNumber: '03417589',
        website: 'www.abchotel.com',
        email: '<EMAIL>',
        description: 'This is a description of the hotel',
        images: [
          {
            imageUrl:
              'http://res.cloudinary.com/dohqjoraz/image/upload/v1707328670/dfwt9zpd0e89my56zrkd.jpg',
          },
        ],
      });
      await this.hotelReopsitory.save(hotel);
    }
  }
}
