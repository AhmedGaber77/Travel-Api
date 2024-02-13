import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, Min, ValidateNested } from 'class-validator';
import { ServiceEntity } from 'src/modules/services/entities/service.entity';
import { Type } from 'class-transformer';
import { CreateTravelerDto } from './create-traveler.dto';

export class CreateReservationDto {
  @ApiProperty({
    type: () => Number,
  })
  @Min(1)
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    type: () => Date,
  })
  @IsNotEmpty()
  checkInDate: Date;

  @ApiPropertyOptional({
    type: () => Date,
  })
  checkOutDate?: Date;

  @ApiPropertyOptional({
    type: () => Number,
  })
  serviceId: ServiceEntity['id'];

  @ApiProperty({
    type: () => [CreateTravelerDto],
  })
  @Type(() => CreateTravelerDto)
  @ValidateNested({ each: true })
  travelers: CreateTravelerDto[];
  // @ApiPropertyOptional({
  //   type: () => Number,
  // })
  // travelOfficeId: TravelOfficeEntity['id'];
}
