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

  findOne(id: number) {
    const wholesaler = this.wholesalersRepository.findOne({ where: { id } });
    if (!wholesaler) {
      throw new NotFoundException(`wholesaler with id ${id} not found`);
    }
    return wholesaler;
  }

  async update(id: number, updateWholesalerDto: UpdateWholesalerDto) {
    const Existingwholesaler = await this.wholesalersRepository.findOne({
      where: { id },
    });
    if (!Existingwholesaler) {
      throw new NotFoundException(`wholesaler with id ${id} not found`);
    }
    await this.wholesalersRepository.update(id, updateWholesalerDto);
    return this.wholesalersRepository.findOne({ where: { id } });
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
