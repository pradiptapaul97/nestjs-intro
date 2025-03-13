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

    /**Delete Tag */
    public async delete(id: number) {
        await this.tagRepository.delete(id);

        return { deleted: true, id };
    }

    /**Soft Delete Tag */
    public async softRemove(id: number) {
        await this.tagRepository.softDelete(id);

        return { deleted: true, id };
    }
}
