import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsJSON, IsString } from 'class-validator';

export class CreatePostMetaOptionDto {

  @ApiPropertyOptional({
    example: "This is a metaValue",
    description: "This is the metaValue for create meta options"
  })
  @IsString()
  @IsJSON()
  metaValue: string;
}
