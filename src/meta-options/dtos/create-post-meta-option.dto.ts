import { IsJSON, IsString } from 'class-validator';

export class CreatePostMetaOptionDto {

  @IsString()
  @IsJSON()
  metaValue: string;
}
