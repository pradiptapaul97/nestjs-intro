import { IsString, IsOptional, IsEnum, IsArray, IsDate, ValidateNested, MinLength, IsNotEmpty, Matches, isJSON, IsJSON, IsUrl, IsISO8601 } from 'class-validator';
import { Type } from 'class-transformer';
import { PostType } from '../enums/postType.enum';
import { PostStatus } from '../enums/postStatus.enum';
import { PostMetaOptions } from '../enums/postMetaOptions.enum';

/**
 * Structure of request body to create a new post
 * **************
 * title: string
 * postType : enum (post, page, story, series)
 * slug: string
 * status: enm (drasft, scheduled, review, published)
 * content?: string
 * schema?: string // jso stringfied
 * featuredImageUrl?: string
 * publishOn: Date
 * tags: string[]
 * metaOptions: [{key:value}]
 */

export class CreatePostDto{
    
    @IsString()
    @MinLength(4)
    @IsNotEmpty()
    title: string;

    @IsEnum(PostType)
    @IsNotEmpty()
    postType: PostType;

    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: 'Slug can only contain lowercase letters, numbers, and hyphens',
    })
    slug: string;

    @IsEnum(PostStatus)
    @IsNotEmpty()
    status: PostStatus;

    @IsOptional()
    @IsString()
    content?: string;

    @IsOptional()
    @IsJSON()
    schema?: string;

    @IsOptional()
    @IsUrl()
    featuredImageUrl?: string;

    //@IsDate()
    @IsISO8601()
    @IsOptional()
    // @Type(() => Date)
    publishOn: Date;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @MinLength(3,{each:true})
    tags: string[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PostMetaOptions)
    metaOptions: PostMetaOptions[];
}