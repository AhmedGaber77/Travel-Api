import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePackageDayDto {
  @ApiProperty({
    type: () => String,
  })
  @IsNotEmpty()
  @IsString()
  dayName: string;

  @ApiProperty({
    type: () => String,
  })
  @IsNotEmpty()
  @IsString()
  dayDescription: string;
}
