import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class CreateTravelerDto {
  @ApiProperty({
    type: () => String,
    example: 'John',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    type: () => String,
    example: 'Doe',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiPropertyOptional({
    type: () => String,
    example: 'john@doe.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    type: () => String,
    example: '+1234567890',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  mobilePhone: string;

  @ApiPropertyOptional({
    type: () => Date,
    example: '2021-01-01',
  })
  @IsOptional()
  dateOfBirth?: Date;

  @ApiProperty({
    description: 'The file ids of the traveler',
    example: [1, 2, 3],
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsPositive({ each: true })
  fileIds?: number[];
}
