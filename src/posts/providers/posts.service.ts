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
    //create meta options

    let metaOptions = (createPostDto.metaOptions) ? this.metaOptionRepository.create(createPostDto.metaOptions) : null

    if (metaOptions) {
      await this.metaOptionRepository.save(metaOptions)
    }
    //create post
    let post = this.postRepository.create(createPostDto); // ✅ Works fine

    //add metaoptions in  post
    if (metaOptions) {
      post.metaOptions = metaOptions;
    }
    return await this.postRepository.save(post); // ✅ Works fine

  }

  /**
   * findAll
   */
  public findAll(userId: string) {
    //find user

    const user = this.userService.findOneById(userId);

    return [
      {
        user: user,
        title: 'The Future of Technology',
        content:
          'Technology is evolving rapidly, shaping the way we live and work every day. From AI to IoT, the future holds endless possibilities.',
      },
      {
        user: user,
        title: 'Health & Wellness Tips',
        content:
          'Maintaining a balanced diet, regular exercise, and mental health care are key to leading a healthy lifestyle.',
      },
      {
        user: user,
        title: 'Travel Guide for 2025',
        content:
          'Discover the top travel destinations for 2025, from hidden gems to popular tourist spots. Start planning your next adventure!',
      },
      {
        user: user,
        title: 'Understanding Personal Finance',
        content:
          'Learn how to manage your finances, invest wisely, and build wealth over time with smart financial planning.',
      },
      {
        user: user,
        title: 'The Rise of Remote Work',
        content:
          'Remote work is transforming businesses globally. Explore the benefits, challenges, and future of remote work culture.',
      },
    ];
  }
}
