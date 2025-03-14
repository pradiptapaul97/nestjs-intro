import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import { Tag } from './tags/tag.entity';
import { MetaOption } from './meta-options/meta-option.entity';
import { ConfigModule } from '@nestjs/config';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: ['.env.development']
      envFilePath: !ENV ? '.env' : `.env.${ENV}`
    }),
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'postgres',
        // entities: [User, Tag, MetaOption],
        autoLoadEntities: true,//works when import entity into module
        synchronize: true,
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'Password@123',
        database: 'nestjs-blog'
      })
    }),
    TagsModule,
    MetaOptionsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
