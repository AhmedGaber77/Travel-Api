import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWholesalerDto } from './dto/create-wholesaler.dto';
import { UpdateWholesalerDto } from './dto/update-wholesaler.dto';
import { WholesalerEntity } from './entities/wholesaler.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/domain/user';

@Injectable()
export class WholesalersService {
  constructor(
    @InjectRepository(WholesalerEntity)
    private wholesalersRepository: Repository<WholesalerEntity>,
    private readonly userService: UsersService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async create(
    createWholesalerDto: CreateWholesalerDto,
  ): Promise<WholesalerEntity> {
    const existingWholesaler = await this.wholesalersRepository.findOne({
      where: [
        {
          name: createWholesalerDto.name,
        },
        {
          email: createWholesalerDto.email,
        },
        {
          phone: createWholesalerDto.phone,
        },
      ],
    });
    if (existingWholesaler) {
      throw new BadRequestException(
        'Wholesaler with the same name, email or phone already exists',
      );
    }
    const wholesaler = this.wholesalersRepository.create(createWholesalerDto);

    return await this.wholesalersRepository.save(wholesaler);
  }

  async findAll(): Promise<WholesalerEntity[]> {
    return this.wholesalersRepository.find();
  }

  async findOne(id: number): Promise<WholesalerEntity> {
    const wholesaler = await this.wholesalersRepository.findOne({
      where: { id },
      relations: {
        travelOffices: true,
      },
      select: {
        travelOffices: {
          name: true,
          email: true,
          phone: true,
        },
      },
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

  async softDelete(id: number): Promise<boolean> {
    const wholesaler = await this.findOne(id);
    await this.wholesalersRepository.softDelete(wholesaler.id);
    return true;
  }

  async findUsersByWholesalerId(id: number): Promise<User[]> {
    const users = await this.wholesalersRepository.findOne({
      where: { id },
      relations: {
        users: true,
      },
    });
    return users?.users ?? [];
  }

  async addUserToWholesaler(
    wholesalerId: number,
    userId: number,
  ): Promise<void> {
    const wholesaler = await this.findOne(wholesalerId);
    const user = await this.userService.findOne({ id: userId });
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
