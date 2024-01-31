import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateWholesalerDto } from './dto/create-wholesaler.dto';
import { UpdateWholesalerDto } from './dto/update-wholesaler.dto';
import { WholesalerEntity } from './entities/wholesaler.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';

@Injectable()
export class WholesalersService {
  constructor(
    @InjectRepository(WholesalerEntity)
    private wholesalersRepository: Repository<WholesalerEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
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
      relations: ['travelOffices'],
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

  async findUsersByWholesalerId(id: number): Promise<UserEntity[]> {
    const wholesaler = await this.findOne(id);
    return wholesaler.users ? wholesaler.users : [];
  }

  async addUserToWholesaler(
    wholesalerId: number,
    userId: number,
  ): Promise<void> {
    const wholesaler = await this.findOne(wholesalerId);
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    if (user.wholesalerId !== null && user.wholesalerId !== wholesaler.id) {
      throw new HttpException(
        `User with id ${userId} is already assigned to a wholesaler`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (user.travelOfficeId !== null) {
      throw new HttpException(
        `User with id ${userId} is already assigned to a travel office`,
        HttpStatus.BAD_REQUEST,
      );
    }
    user.wholesalerId = wholesaler.id;
    if (!wholesaler.users) {
      wholesaler.users = [];
    }
    wholesaler.users.push(user);
    await this.wholesalersRepository.save(wholesaler);
  }
}
