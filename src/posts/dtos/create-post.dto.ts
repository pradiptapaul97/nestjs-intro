import {
  IsString,
  IsOptional,
  IsEnum,
  IsArray,
  ValidateNested,
  MinLength,
  IsNotEmpty,
  Matches,
  IsJSON,
  IsUrl,
  IsISO8601,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PostType } from '../enums/postType.enum';
import { PostStatus } from '../enums/postStatus.enum';
// import { PostMetaOptions } from '../enums/postMetaOptions.enum';
import { CreatePostMetaOptionDto } from '../../meta-options/dtos/create-post-meta-option.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Structure of request body to create a new post
 * **************
 * title: string
 * postType : enum (post, page, story, series)
 * slug: string
 * status: enm (draft, scheduled, review, published)
 * content?: string
 * schema?: string // jso stringfied
 * featuredImageUrl?: string
 * publishOn: Date
 * tags: string[]
 * metaOptions: [{key:value}]
 */

export class CreatePostDto {
  @ApiProperty({
    example: "This is a title",
    description: "This is the title for blog post"
  })
  @IsString()
  @MinLength(4)
  @MaxLength(512)
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    enum: PostType,
    description: "This is the post type for blog post.Possible values post, page, story, series"
  })
  @IsEnum(PostType)
  @IsNotEmpty()
  postType: PostType;

  @ApiProperty({
    description: "This is the slug for blog post",
    example: "my-blog-post"
  })
  @IsString()
  @MaxLength(256)
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'Slug can only contain lowercase letters, numbers, and hyphens',
  })
  slug: string;

  @ApiProperty({
    enum: PostStatus,
    description: "This is the status for blog post.Possible values draft, scheduled, review, published",
    example: "my-blog-post"
  })
  @IsEnum(PostStatus)
  @IsNotEmpty()
  status: PostStatus;

  @ApiPropertyOptional({
    example: "This is a content",
    description: "This is the content for blog post"
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({
    example: "{\"key\": \"value\"}",
    description: "Serialize your JSON object."
  })
  @IsOptional()
  @IsJSON()
  schema?: string;

  @ApiPropertyOptional({
    example: "https://images.pexels.com/photos/2990603/pexels-photo-2990603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "This is the featured image for blog post"
  })
  @MaxLength(1024)
  @IsOptional()
  @IsUrl()
  featuredImageUrl?: string;

  //@IsDate()
  @ApiPropertyOptional({
    example: "2025-02-17T12:00:00Z",
    description: "This is the date for blog post"
  })
  @IsISO8601()
  @IsOptional()
  // @Type(() => Date)
  publishOn?: Date;

  @ApiPropertyOptional({
    example: ['first', 'second'],
    description: "This is the tag for blog post which is array of string"
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  tags?: string[];

  //optional but when given the key value ar proper formated
  @ApiPropertyOptional({
    type: 'object',
    properties: {
      metaValue: {
        type: 'json',
        description: "The metaValue is a JSON string",
        example: "{\"sidebarEnable\": true, \"footerActive\": true}"
      }
    }
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionDto)
  metaOptions?: CreatePostMetaOptionDto | null;
}
