import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddUserToWholesalerDto {
  @ApiProperty({
    type: () => Number,
    example: 1,
    description: 'The id of the user',
  })
  @IsNotEmpty()
  userId: number;
}
