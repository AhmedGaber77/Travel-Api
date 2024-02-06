import { Test, TestingModule } from '@nestjs/testing';
import { HotelsService } from './hotels.service';
import { Repository } from 'typeorm';
import { HotelEntity } from './entities/hotel.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';

describe('HotelsService', () => {
  let service: HotelsService;
  let mockHotelRepository: Partial<Repository<HotelEntity>>;

  beforeEach(async () => {
    mockHotelRepository = {
      create: jest.fn().mockImplementation((dto) => dto),
      save: jest
        .fn()
        .mockImplementation((hotel) => Promise.resolve({ id: 1, ...hotel })),
      findOne: jest
        .fn()
        .mockImplementation(({ where: { id } }) =>
          Promise.resolve({ id, name: 'Existing Hotel' }),
        ),
      remove: jest.fn().mockImplementation((hotel) => Promise.resolve(hotel)),
      find: jest.fn().mockImplementation(() =>
        Promise.resolve([
          { id: 1, name: 'Hotel One' },
          { id: 2, name: 'Hotel Two' },
        ]),
      ),
      update: jest
        .fn()
        .mockImplementation((id, dto) => Promise.resolve({ id, ...dto })),
      softDelete: jest.fn().mockImplementation((id) => Promise.resolve({ id })),
      merge: jest
        .fn()
        .mockImplementation((hotel, dto) =>
          Promise.resolve({ ...hotel, ...dto }),
        ),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HotelsService,
        {
          provide: getRepositoryToken(HotelEntity),
          useValue: mockHotelRepository,
        },
      ],
    }).compile();

    service = module.get<HotelsService>(HotelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new hotel record and return that', async () => {
    const createHotelDto: CreateHotelDto = {
      name: 'Test Hotel',
      address: '123 Test St',
      city: 'Test City',
      state: 'TX',
      zipCode: '12345',
      mobileNumber: '1234567890',
    };

    const result = await service.create(createHotelDto);

    expect(mockHotelRepository.create).toHaveBeenCalledWith(createHotelDto);
    expect(mockHotelRepository.save).toHaveBeenCalledWith(createHotelDto);
    expect(result).toEqual({ id: 1, ...createHotelDto });
  });

  it('should retrieve a list of hotels', async () => {
    const result = await service.findAllHotels();
    expect(mockHotelRepository.find).toHaveBeenCalled();
    expect(result).toEqual([
      { id: 1, name: 'Hotel One' },
      { id: 2, name: 'Hotel Two' },
    ]);
  });

  it('should retrieve a single hotel by ID', async () => {
    const result = await service.findOneHotel(1);
    console.log(result);
    expect(result).toEqual({ id: 1, name: 'Existing Hotel' });
  });

  it('should update a hotel record', async () => {
    const updateHotelDto: UpdateHotelDto = {
      name: 'Updated Hotel',
    };
    const result = await service.updateHotel(1, updateHotelDto);
    expect(mockHotelRepository.update).toHaveBeenCalledWith(1, updateHotelDto);
    expect(result).toEqual({ id: 1, ...updateHotelDto });
  });

  it('should delete a hotel record', async () => {
    const result = await service.softDeleteHotel(1);
    expect(mockHotelRepository.remove).toHaveBeenCalledWith({ id: 1 });
    expect(result).toEqual({ id: 1 });
  });
});
