import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
    constructor(
        /**Injection post servise */

        private readonly postService: PostsService
    ){}

    /**
     * GET http://localhost:3000/posta/:userId
     */

    @Get('/:userId?')
    public getPosts(@Param('userId') userId: string ){
        return this.postService.findAll(userId)
    }
}
