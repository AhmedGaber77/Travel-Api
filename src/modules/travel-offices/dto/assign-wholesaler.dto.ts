import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class AssignWholesalerDto {
  @ApiProperty({ type: Number })
  @IsInt()
  wholesalerId: number;
}
