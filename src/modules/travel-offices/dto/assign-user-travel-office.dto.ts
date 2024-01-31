import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddUserToTravelOfficeDto {
  @ApiProperty({
    example: 1,
    description: 'The id of the user',
    type: () => Number,
  })
  @IsNotEmpty()
  userId: number;
}
