import { CreatePostDto } from './create-post.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class PatchPostsDto extends PartialType(CreatePostDto) {
  //PartialType cates all prop of CreateUserDto and make it optional
  //

  @ApiProperty({
    description: "post id"
  })
  @IsInt()
  @IsNotEmpty()
  id: number;
}
