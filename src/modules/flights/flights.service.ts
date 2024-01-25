import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FlightEntity } from './entities/flight.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FlightsService {
  constructor(
    @InjectRepository(FlightEntity)
    private readonly flightRepository: Repository<FlightEntity>,
  ) {}
  findAll() {
    return this.flightRepository.find();
  }

  async findOne(id: number) {
    const flight = await this.flightRepository.findOne({
      where: { id },
      loadRelationIds: true,
    });
    if (!flight) {
      throw new NotFoundException(`Flight with id ${id} not found`);
    }
    return flight;
  }

  async update(id: number, updateFlightDto: UpdateFlightDto) {
    const existingFlight = await this.findOne(id);
    this.flightRepository.merge(existingFlight, updateFlightDto);
    return this.flightRepository.save(existingFlight);
  }
}
