import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsJSON, IsString } from 'class-validator';

export class CreatePostMetaOptionDto {

  @ApiPropertyOptional()
  @IsString()
  @IsJSON()
  metaValue: string;
}
