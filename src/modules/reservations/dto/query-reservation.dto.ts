import { ApiProperty } from '@nestjs/swagger';
import {
  ReservationEntity,
  ReservationStatus,
} from '../entities/reservation.entity';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';

export class FilterReservationDto {
  @ApiProperty({ type: ReservationStatus })
  @IsOptional()
  // @ValidateNested({ each: true })
  @Type(() => String)
  status?: ReservationStatus | null;
}

export class SortReservationDto {
  @ApiProperty()
  @IsString()
  orderBy: keyof ReservationEntity;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryReservationDto {
  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page: number;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit: number;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) =>
    value
      ? plainToInstance(FilterReservationDto, JSON.parse(value))
      : undefined,
  )
  @ValidateNested()
  @Type(() => FilterReservationDto)
  filters?: FilterReservationDto | null;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) => {
    return value
      ? plainToInstance(SortReservationDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortReservationDto)
  sort?: SortReservationDto[] | null;
}
