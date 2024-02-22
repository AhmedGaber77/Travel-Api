import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CancelReservationDto {
  @ApiProperty({
    description: 'Reason for canceling the reservation',
    example: 'the traveler is not allowed to travel to this country.',
  })
  @IsNotEmpty()
  @IsString()
  cancelReason: string;
}
