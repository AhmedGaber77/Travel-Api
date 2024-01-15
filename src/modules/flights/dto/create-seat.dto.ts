import { IsString, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSeatDto {
  @ApiProperty({
    example: 'Economy',
    description: 'The type of the seat (e.g. Economy, Business, First Class)',
  })
  @IsString()
  type: string;

  @ApiProperty({
    example: 100,
    description: 'The price of the seat',
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 50,
    description: 'The quantity of available seats',
  })
  @IsNumber()
  @Min(1)
  quantity: number;
}
