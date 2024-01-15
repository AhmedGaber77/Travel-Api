import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateWholesalerDto } from './dto/create-wholesaler.dto';
import { UpdateWholesalerDto } from './dto/update-wholesaler.dto';
import { WholesalerEntity } from './entities/wholesaler.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WholesalersService {
  constructor(
    @InjectRepository(WholesalerEntity)
    private wholesalersRepository: Repository<WholesalerEntity>,
  ) {}
  async create(
    createWholesalerDto: CreateWholesalerDto,
  ): Promise<WholesalerEntity> {
    try {
      const wholesaler = this.wholesalersRepository.create(createWholesalerDto);
      return await this.wholesalersRepository.save(wholesaler);
    } catch (error) {
      throw new InternalServerErrorException('Error creating wholesaler');
    }
  }

  async findAll(): Promise<WholesalerEntity[]> {
    return this.wholesalersRepository.find();
  }

  async findOne(id: number): Promise<WholesalerEntity> {
    const wholesaler = await this.wholesalersRepository.findOne({
      where: { id },
    });
    if (!wholesaler) {
      throw new NotFoundException(`wholesaler with id ${id} not found`);
    }
    return wholesaler;
  }

  async update(
    id: number,
    updateWholesalerDto: UpdateWholesalerDto,
  ): Promise<WholesalerEntity> {
    const wholesaler = await this.findOne(id);
    this.wholesalersRepository.merge(wholesaler, updateWholesalerDto);
    return this.wholesalersRepository.save(wholesaler);
  }

  async remove(id: number): Promise<boolean> {
    const wholesaler = await this.findOne(id);
    await this.wholesalersRepository.softDelete(wholesaler.id);
    return true;
  }
}
