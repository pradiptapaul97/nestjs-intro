import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 96,
        nullable: false
    })
    first_name: string;

    @Column({
        type: "varchar",
        length: 96,
        nullable: true
    })
    last_name: string;

    @Column({
        type: "varchar",
        length: 96,
        unique: true,
        nullable: false
    })
    email: string;

    @Column({
        type: "varchar",
        length: 96,
        nullable: false
    })
    password: string;
}