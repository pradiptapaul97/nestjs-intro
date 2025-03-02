import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';

/**
 * Class to connect to user table and perform buisness operations
 */
@Injectable()
export class UsersService {
  /**User service construstor */
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    /**
     * INJECTION USER REPOSITORY
     */

    @InjectRepository(User)
    private UsersRepository: Repository<User>
  ) { }

  /**
   * Create User
   */

  public async createUser(createUserDto: CreateUserDto) {
    //check user exists
    const existingUser = await this.UsersRepository.findOne({
      where: {
        email: createUserDto.email
      }
    });

    if (existingUser) {
      return existingUser;
    }
    else {
      let newUser = this.UsersRepository.create(createUserDto);
      newUser = await this.UsersRepository.save(newUser);

      return newUser;
    }

    //User exists handle exception

    //user not exists create user
  }

  /**
   * findAll user
   */
  public findAll(
    getUserParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    const isAuth = this.authService.isAuth();

    console.log(isAuth, getUserParamDto, limit, page);

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
   * findOneById user
   */
  public async findOneById(id: number) {
    console.log(id);

    return await this.UsersRepository.findOneBy({ id })
  }
}
