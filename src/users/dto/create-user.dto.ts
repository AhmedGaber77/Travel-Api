import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';
import { RoleDto } from 'src/roles/dto/role.dto';
import { StatusDto } from 'src/statuses/dto/status.dto';
import { FileDto } from 'src/files/dto/file.dto';
import { GalleryEntity } from 'src/image-upload/entities/gallery.entity';
import { TravelOfficeEntity } from 'src/modules/travel-offices/entities/travel-office.entity';

export class CreateUserDto {
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @IsEmail()
  email: string | null;

  @ApiProperty()
  @MinLength(6)
  password?: string;

  provider?: string;

  socialId?: string | null;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  firstName: string | null;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  lastName: string | null;

  @ApiProperty({ type: () => FileDto })
  @IsOptional()
  photo?: FileDto | null;

  @ApiProperty({ type: () => Number })
  @IsOptional()
  profilePhotoId?: GalleryEntity['id'] | null;

  @ApiProperty({ type: () => GalleryEntity })
  @IsOptional()
  profilePhoto?: GalleryEntity | null;

  @ApiProperty({ type: RoleDto })
  @IsOptional()
  @Type(() => RoleDto)
  role?: RoleDto | null;

  @ApiProperty({ type: () => TravelOfficeEntity })
  @IsOptional()
  travelOffice?: TravelOfficeEntity | null;

  @ApiProperty({ type: () => Number })
  @IsOptional()
  travelOfficeId?: number | null;

  @ApiProperty({ type: StatusDto })
  @IsOptional()
  @Type(() => StatusDto)
  status?: StatusDto;

  hash?: string | null;
}
