import { Body, Controller, Post } from '@nestjs/common';
import { MetaOptionsService } from './providers/meta-options.service';
import { CreatePostMetaOptionDto } from './dtos/create-post-meta-option.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('meta-options')
@ApiTags('Meta Option')
export class MetaOptionsController {
    constructor(
        private readonly metaOptionService: MetaOptionsService
    ) { }

    @Post()
    public createMetaOption(@Body() createPostMetaOptionDto: CreatePostMetaOptionDto) {
        return this.metaOptionService.create(createPostMetaOptionDto)
    }
}
