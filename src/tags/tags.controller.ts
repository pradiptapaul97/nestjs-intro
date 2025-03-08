import { Body, Controller, Post } from '@nestjs/common';
import { TagsService } from './providers/tags.service';
import { CreateTagDto } from './dtos/create-tag.dto';

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
}
