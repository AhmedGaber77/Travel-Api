import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateSafariDto } from './dto/update-safari.dto';
import { SafariEntity } from './entities/safari.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SafariService {
  constructor(
    @InjectRepository(SafariEntity)
    private readonly safariRepository: Repository<SafariEntity>,
  ) {}

  findAll() {
    return this.safariRepository.find();
  }

  async findOne(id: number) {
    const safari = await this.safariRepository.findOne({
      where: { id },
      relations: ['service'],
    });
    if (!safari) {
      throw new NotFoundException(`Safari with id ${id} not found`);
    }
    return safari;
  }

  async update(id: number, updateSafariDto: UpdateSafariDto) {
    const existingSafari = await this.findOne(id);
    this.safariRepository.merge(existingSafari, updateSafariDto);
    return this.safariRepository.save(existingSafari);
  }
}
