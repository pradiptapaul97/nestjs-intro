import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PostType } from "./enums/postType.enum";
import { PostStatus } from "./enums/postStatus.enum";
import { CreatePostMetaOptionDto } from "../meta-options/dtos/create-post-meta-option.dto";
import { Tag } from "src/tags/tag.entity";
import { MetaOption } from "src/meta-options/meta-option.entity";
import { User } from "src/users/user.entity";


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

    @OneToOne(() => MetaOption, (metaOptions) => metaOptions.post, {
        // cascade: ["insert" , "update" , "remove" , "soft-remove" , "recover"]
        cascade: true, //use for autometically add meta option data to meta option entity table
        eager: true,//use for get mata option data with post data
    })
    // @JoinColumn()
    metaOptions?: MetaOption;

    @ManyToOne(() => User, (user) => user.posts, {
        eager: true
    })
    author: User;

    @ManyToMany(() => Tag, (tag) => tag.posts, {
        eager: true
    })
    @JoinTable()
    tags?: Tag[];
}