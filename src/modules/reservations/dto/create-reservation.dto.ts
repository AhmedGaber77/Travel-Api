import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ServiceEntity } from 'src/modules/services/entities/service.entity';
import { TravelOfficeEntity } from 'src/modules/travel-offices/entities/travel-office.entity';

export class CreateReservationDto {
  @ApiProperty({
    type: () => Number,
  })
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

  @ApiPropertyOptional({
    type: () => Number,
  })
  travelOfficeId: TravelOfficeEntity['id'];
}
