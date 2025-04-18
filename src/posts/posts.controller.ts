import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostsDto } from './dtos/patch-post.dto';

/**Post controller */
@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(
    /**Injection post servise */

    private readonly postService: PostsService,
  ) { }

  /**
   * GET http://localhost:3000/posta/:userId
   */

  @Get('/:userId?')
  public getPosts(@Param('userId') userId: number) {
    return this.postService.findAll(userId);
  }

  /**
   * createPost
   */
  @ApiOperation({
    summary: 'Create a blog post'
  })
  @ApiResponse({
    status: 201,
    description: "Post created success"
  })
  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }


  /**
   * updatePost
   */
  @ApiOperation({
    summary: 'Update a blog post'
  })
  @ApiResponse({
    status: 200,
    description: "Post updated success"
  })
  @Patch()
  public updatePost(@Body() patchPostsDto: PatchPostsDto) {
    return this.postService.updatePost(patchPostsDto);
  }

  /**
   * deletePost
   */
  @ApiOperation({
    summary: 'Delete a blog post'
  })
  @ApiResponse({
    status: 200,
    description: "Post deleted success"
  })
  @Delete('/:id')
  public deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.delete(id);
  }
}
