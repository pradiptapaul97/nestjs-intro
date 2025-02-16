import { Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';

@Injectable()
export class UsersService {
    /**
     * findAll
     */
    public findAll(
        getUserParamDto: GetUsersParamDto,
        limit: number,
        page: number
    ) {
        
        return [
            {
              first_name: 'Pradipta',
              last_name: 'Paul',
              email: 'pradipta@yopmail.com',
              password: 'Password@123',
            },
            {
              first_name: 'John',
              last_name: 'Doe',
              email: 'john.doe@yopmail.com',
              password: 'Password@123',
            },
            {
              first_name: 'Jane',
              last_name: 'Smith',
              email: 'jane.smith@yopmail.com',
              password: 'Password@123',
            },
            {
              first_name: 'Alice',
              last_name: 'Johnson',
              email: 'alice.johnson@yopmail.com',
              password: 'Password@123',
            },
            {
              first_name: 'Bob',
              last_name: 'Brown',
              email: 'bob.brown@yopmail.com',
              password: 'Password@123',
            },
        ];
    }

    /**
     * findOneById
     */
    public findOneById(id: string) {
        return {
            first_name: 'John',
            last_name: 'Doe',
            email: 'john.doe@yopmail.com',
            password: 'Password@123',
        }
    }
}
