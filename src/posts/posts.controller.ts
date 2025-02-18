import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(
    /**Injection post servise */

    private readonly postService: PostsService,
  ) {}

  /**
   * GET http://localhost:3000/posta/:userId
   */

  @Get('/:userId?')
  public getPosts(@Param('userId') userId: string) {
    return this.postService.findAll(userId);
  }

  @Post()
  @ApiBody({
    //
  })
  /**
   * createPost
   */
  public createPost(@Body() createPostDto: CreatePostDto) {
    return createPostDto;
  }
}
