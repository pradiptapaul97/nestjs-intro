import { BadRequestException, forwardRef, Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigService, ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';

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
    private UsersRepository: Repository<User>,

    /**INJECTION CONFIG SERVISE */
    private readonly configService: ConfigService,

    //module specific config

    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>
  ) { }

  /**
   * Create User
   */

  public async createUser(createUserDto: CreateUserDto) {
    //check user exists

    let existingUser = undefined;

    try {
      existingUser = await this.UsersRepository.findOne({
        where: {
          email: createUserDto.email
        }
      });
    } catch (error) {
      throw new RequestTimeoutException('Unable to process your request at the moment please try again later', {
        description: "Error connecting to the database"
      })
    }


    if (existingUser) {
      throw new BadRequestException('The user is already exists. Please check your email.')
    }

    let newUser = this.UsersRepository.create(createUserDto);

    try {
      newUser = await this.UsersRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException('Unable to process your request at the moment please try again later', {
        description: "Error connecting to the database"
      })
    }

    return newUser;

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

    // const environment = this.configService.get('S3_BUCKET');

    // const environment = this.configService.get<string>('S3_BUCKET'); // typecast the final value we are expecting

    //test new config

    console.log(this.profileConfiguration);
    console.log(this.profileConfiguration.apikey);



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
    let userdata = undefined;

    try {
      userdata = await this.UsersRepository.findOneBy({ id })
    } catch (error) {
      throw new RequestTimeoutException('Unable to process your request at the moment please try again later', {
        description: "Error connecting to the database"
      })
    }

    if (!userdata) {
      throw new BadRequestException('The user id is not exists.')
    }

    return userdata;

  }
}
