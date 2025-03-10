import { Post } from "src/posts/post.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Tag {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "varchar",
        length: 256,
        nullable: false,
        unique: true
    })
    name: string;

    @Column({
        type: "varchar",
        length: 256,
        nullable: false,
        unique: true
    })
    slug: string;

    @Column({
        type: "text",
        nullable: true
    })
    description?: string;

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

    @ManyToMany(() => Post, (post) => post.tags, {
        onDelete: 'CASCADE'//for avoid and delete tag with post from post tag tag table because of post is the owning site og manytomany relation
    })
    posts?: Post[];

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;

    @DeleteDateColumn()
    deleteAt: Date;

}