import { Injectable, NotFoundException } from '@nestjs/common';
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
  create(createWholesalerDto: CreateWholesalerDto): Promise<WholesalerEntity> {
    const wholesaler = this.wholesalersRepository.create(createWholesalerDto);
    return this.wholesalersRepository.save(wholesaler);
  }

  findAll() {
    return this.wholesalersRepository.find();
  }

  async findOne(id: number) {
    const wholesaler = await this.wholesalersRepository.findOne({
      where: { id },
    });
    if (!wholesaler) {
      throw new NotFoundException(`wholesaler with id ${id} not found`);
    }
    return wholesaler;
  }

  async update(id: number, updateWholesalerDto: UpdateWholesalerDto) {
    let wholesaler = await this.wholesalersRepository.preload({
      id: id,
      ...updateWholesalerDto,
    });
    if (!wholesaler) {
      throw new NotFoundException(`wholesaler with id ${id} not found`);
    }
    wholesaler = await this.wholesalersRepository.save(wholesaler);
    return wholesaler;
  }

  async remove(id: number) {
    const wholesaler = await this.findOne(id);
    await this.wholesalersRepository.softDelete(wholesaler.id);
  }
}
