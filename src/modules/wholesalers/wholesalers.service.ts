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
    const wholesalers = this.wholesalersRepository.find();
    return wholesalers;
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
    const result = await this.wholesalersRepository.update(id, {
      deletedAt: new Date(),
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Wholesaler with id ${id} not found`);
    }
  }
}
