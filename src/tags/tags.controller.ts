import { Body, Controller, Delete, Param, ParseIntPipe, Post } from '@nestjs/common';
import { TagsService } from './providers/tags.service';
import { CreateTagDto } from './dtos/create-tag.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('tags')
export class TagsController {
    constructor(
        private readonly tagService: TagsService
    ) {

    }

    /**
     * Create Tag
     */

    @Post()
    public async createTag(@Body() createTagdto: CreateTagDto) {
        return await this.tagService.createTag(createTagdto)
    }

    /**
       * deleteTag
       */
    @ApiOperation({
        summary: 'Delete a blog tag'
    })
    @ApiResponse({
        status: 200,
        description: "Tag deleted success"
    })
    @Delete('/:id')
    public deleteTag(@Param('id', ParseIntPipe) id: number) {
        return this.tagService.delete(id);
    }
}
