import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PostType } from "./enums/postType.enum";
import { PostStatus } from "./enums/postStatus.enum";
import { CreatePostMetaOptionDto } from "../meta-options/dtos/create-post-meta-option.dto";
import { Tag } from "src/tags/tag.entity";
import { MetaOption } from "src/meta-options/meta-option.entity";


@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number


    @Column({
        type: "varchar",
        length: 512,
        nullable: false
    })
    title: string;

    @Column({
        type: "enum",
        enum: PostType,
        nullable: false,
        default: PostType.POST
    })
    postType: PostType;

    @Column({
        type: "varchar",
        length: 256,
        nullable: false,
        unique: true
    })
    slug: string;

    @Column({
        type: "enum",
        enum: PostStatus,
        default: PostStatus.DRAFT,
        nullable: false
    })
    status: PostStatus;

    @Column({
        type: "text",
        nullable: true
    })
    content?: string;

    @Column({
        type: "text",
        length: 96,
        nullable: true
    })
    schema?: string;

    @Column({
        type: "varchar",
        length: 1024,
        nullable: true
    })
    featuredImageUrl?: string;

    @Column({
        type: "timestamp",
        nullable: true
    })
    publishOn?: Date;

    @OneToMany(() => Tag, (tag) => tag.id)
    tags?: Tag[];

    @OneToMany(() => MetaOption, (metaOption) => metaOption.id)
    metaOptions?: CreatePostMetaOptionDto[];
}