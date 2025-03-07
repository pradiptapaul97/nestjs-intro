import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Tag } from '../tag.entity';
import { CreateTagDto } from '../dtos/create-tag.dto';

@Injectable()
export class TagsService {
    constructor(

        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>

    ) { }

    public async createTag(createTag: CreateTagDto) {

        let tagObject = this.tagRepository.create(createTag);

        return this.tagRepository.save(tagObject);
    }

    public async findMultipleTags(tags: number[]) {
        let resulte = await this.tagRepository.find({
            where: {
                id: In(tags)
            }
        });

        return resulte;
    }
}
