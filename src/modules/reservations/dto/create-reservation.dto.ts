import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, Min } from 'class-validator';
import { ServiceEntity } from 'src/modules/services/entities/service.entity';

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

  // @ApiPropertyOptional({
  //   type: () => Number,
  // })
  // travelOfficeId: TravelOfficeEntity['id'];
}
