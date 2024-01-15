import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTravelOfficeDto } from './dto/create-travel-office.dto';
import { UpdateTravelOfficeDto } from './dto/update-travel-office.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TravelOfficeEntity } from './entities/travel-office.entity';
import { Repository } from 'typeorm';
import { WholesalersService } from '../wholesalers/wholesalers.service';

@Injectable()
export class TravelOfficesService {
  constructor(
    @InjectRepository(TravelOfficeEntity)
    private travelOfficeRepository: Repository<TravelOfficeEntity>,
    private wholesalerService: WholesalersService,
  ) {}
  async create(
    createTravelOfficeDto: CreateTravelOfficeDto,
  ): Promise<TravelOfficeEntity> {
    console.log(createTravelOfficeDto);
    const wholesaler = await this.wholesalerService.findOne(
      createTravelOfficeDto.WholesalerId,
    );
    try {
      const travelOffice = this.travelOfficeRepository.create(
        createTravelOfficeDto,
      );
      console.log(wholesaler);
      travelOffice.wholesaler = wholesaler;
      await this.travelOfficeRepository.save(travelOffice);
      return this.findOne(travelOffice.id);
    } catch (error) {
      throw new InternalServerErrorException('Error creating travel office');
    }
  }

  async findAll(): Promise<TravelOfficeEntity[]> {
    return this.travelOfficeRepository.find();
  }

  async findOne(id: number): Promise<TravelOfficeEntity> {
    const travelOffice = await this.travelOfficeRepository.findOne({
      where: { id },
      relations: ['wholesaler'],
    });
    if (!travelOffice) {
      throw new NotFoundException(`Travel office with id ${id} not found`);
    }
    return travelOffice;
  }

  async findOneByEmail(email: string): Promise<TravelOfficeEntity | undefined> {
    const travelOffice = await this.travelOfficeRepository.findOne({
      where: { email },
    });
    if (!travelOffice) {
      return;
    }
    return travelOffice;
  }

  async update(
    id: number,
    updateTravelOfficeDto: UpdateTravelOfficeDto,
  ): Promise<TravelOfficeEntity> {
    const travelOffice = await this.findOne(id);
    this.travelOfficeRepository.merge(travelOffice, updateTravelOfficeDto);
    return this.travelOfficeRepository.save(travelOffice);
  }

  async remove(id: number): Promise<boolean> {
    const travelOffice = await this.findOne(id);
    const result = await this.travelOfficeRepository.softDelete(
      travelOffice.id,
    );
    if (result.affected === 0) {
      return false;
    }
    return true;
  }

  async findWholesalerByTravelOfficeId(travelOfficeId: number) {
    const travelOffice = await this.findOne(travelOfficeId);
    const wholesaler = travelOffice.wholesaler;
    if (!wholesaler) {
      throw new NotFoundException(
        `No wholesaler assigned to travelOffice with id ${travelOfficeId}`,
      );
    }
    return wholesaler;
  }

  async assignWholesalerToTravelOffice(
    travelOfficeId: number,
    wholesalerId: number,
  ) {
    const travelOffice = await this.findOne(travelOfficeId);
    const wholesaler = await this.wholesalerService.findOne(wholesalerId);
    travelOffice.wholesaler = wholesaler;
    await this.travelOfficeRepository.save(travelOffice);
    return travelOffice;
  }
}
