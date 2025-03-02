import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';

@Injectable()
export class PostsService {
  constructor(
    /**Injecting user servise */
    private readonly userService: UsersService,

    /**Injecting post repository */
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>, // ✅ Correct injection

    /**Injecting meta option repository */
    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption> // ✅ Correct injection
  ) { }

  /**
   * Create Posts
   */

  public async createPost(createPostDto: CreatePostDto) {
    //create post
    let post = this.postRepository.create(createPostDto); // ✅ Works fine

    return await this.postRepository.save(post); // ✅ Works fine

  }

  /**
   * findAll
   */
  public async findAll(userId: string) {
    //find user

    const user = this.userService.findOneById(userId);

    //for entity eager false
    // let post = await this.postRepository.find({
    //   relations: {
    //     metaOptions: true
    //   }
    // })

    //for entity eager true
    let post = await this.postRepository.find({})

    return post;
  }

  /**Delete Post */
  public async delete(id: number) {
    //find post
    // let post = await this.postRepository.findOneBy({ id });

    await this.postRepository.delete(id);

    // await this.metaOptionRepository.delete(post.metaOptions.id)

    //after setting by directional relationship

    // let inversePost = await this.metaOptionRepository.find({
    //   where: { id: post.metaOptions.id },
    //   relations: {
    //     post: true,
    //   }
    // });


    return { deleted: true, id };
  }
}
