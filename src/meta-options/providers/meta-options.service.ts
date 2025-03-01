import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from '../meta-option.entity';
import { Repository } from 'typeorm';
import { CreatePostMetaOptionDto } from '../dtos/create-post-meta-option.dto';

@Injectable()
export class MetaOptionsService {
    constructor(
        @InjectRepository(MetaOption)
        private readonly metaOptionRepository: Repository<MetaOption> // ✅ Correct injection
    ) { }

    public async create(createPostMetaOptionDto: CreatePostMetaOptionDto) {
        let savedata = this.metaOptionRepository.create(createPostMetaOptionDto); // ✅ Works fine
        return await this.metaOptionRepository.save(savedata); // ✅ Works fine
    }
}