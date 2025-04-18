import { BadRequestException, forwardRef, HttpException, HttpStatus, Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateManyUserDto, CreateUserDto } from '../dtos/create-user.dto';
import { ConfigService, ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';
import { UsersCreateManyProvider } from './users-create-many.provider';

/**
 * Class to connect to user table and perform buisness operations
 */
@Injectable()
export class UsersService {
  /**User service constructor */
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
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,

    /**
     * INJECT usersCreatemanyProvider
     */
    private readonly usersCreateManyProvider: UsersCreateManyProvider
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

    throw new HttpException({
      status: HttpStatus.MOVED_PERMANENTLY,
      error: 'The api endpoint does not exists',
      fileName: 'users.service.ts',
      lineNumber: 88
    },
      HttpStatus.MOVED_PERMANENTLY,
      {
        cause: new Error(),
        description: 'Occurred because the api endpoint is permanently moved'
      })
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

  public async createManyUser(createManyUserDto: CreateManyUserDto) {
    return await this.usersCreateManyProvider.createManyUser(createManyUserDto)
  }

}
