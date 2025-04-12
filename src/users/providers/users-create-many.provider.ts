import { BadRequestException, ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from '../user.entity';
import { CreateManyUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UsersCreateManyProvider {

    constructor(

        /**
         * INJECT DATASOURCE
         */
        private readonly dataSource: DataSource
    ) { }

    /**
       * Create many User
      */

    public async createManyUser(createManyUserDto: CreateManyUserDto) {

        let newUsers: User[] = [];

        //Create Query Runner Instance
        console.log("Create Query Runner Instance");

        const queryRunner = this.dataSource.createQueryRunner();

        try {
            //Connect Query runner to datasource
            console.log("Connect Query runner to datasource");
            await queryRunner.connect();

            //Start Transaction
            console.log("Start Transaction");
            await queryRunner.startTransaction();

        } catch (error) {
            throw new RequestTimeoutException('Unable to process your request at the moment please try again later', {
                description: "Error connecting to the database"
            })
        }

        try {
            for (const user of createManyUserDto.users) {
                let newUser = queryRunner.manager.create(User, user);
                let result = await queryRunner.manager.save(newUser);
                newUsers.push(result);
            }

            //If successful commit
            console.log("If successful commit");
            await queryRunner.commitTransaction();

        } catch (error) {
            //If unsuccessful rollback
            console.log("If unsuccessful rollback");
            await queryRunner.rollbackTransaction();

            throw new ConflictException('Could not complete transaction', {
                description: String(error)
            })
        }
        finally {

            try {
                //Release connection
                console.log("Release connection");
                await queryRunner.release();
            } catch (error) {
                throw new RequestTimeoutException('Unable to process your request at the moment please try again later', {
                    description: String(error)
                })
            }
        }

        if (newUsers.length !== createManyUserDto.users.length) {
            throw new BadRequestException('The user id is not exists.')
        }

        return newUsers;

    }
}
