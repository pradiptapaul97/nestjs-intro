import { 
    Controller,
    Get,
    Post,
    Put,
    Patch,
    Delete,
    Param,
    Query,
    Body,
    Headers,
    Ip,
    ParseIntPipe,
    DefaultValuePipe,
    ValidationPipe
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './providers/users.service';

@Controller('users')
export class UsersController {

    constructor(
        //Injecting servise
        private readonly usersService: UsersService
    ){}

    /**PATCH SECTION */
    @Patch()
    /**
     * patchUser
     */
    public patchUser(
        @Body() updateUserDto: UpdateUserDto
    ){
        return { status:200, data: updateUserDto, message: `User Updated` }
    }

    /**POST SECTION */

    // @Post()
    // public createUsers(@Body() body: any){
    //     return `You send a post request to users endpoints body => ${JSON.stringify(body)}`
    // }

    @Post()
    public createUsers(
        @Body() createUserDto: CreateUserDto
    ){
        return { status:200, data: createUserDto, message: `User Added` }
    }

    /**GET SECTION */

    /**3 */
    /**
     * Final Endpoint - /users/id?limit=10&page=1
     * Param id - optional, converted to intiger, cannot have default value
     * Query limit - integer, default 10
     * Query page - intiger, default value 1
     * ==> use cases
     * /users/ -> return all users with default pagination
     * /users/123456 -> returns one user whose id = 132456
     * /users?limit=10&page=2 -> return page 2 with limit of pagination 10
     */
    @Get('/:id?')
    public getUsers(
        @Param() getUserParamDto: GetUsersParamDto, 
        //@Param('id', ParseIntPipe) id: number | undefined, //for required field
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number, 
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number
    ){
        return this.usersService.findAll(getUserParamDto, limit, page)
    }

    /**2 */
    /**For specific param and query */
    // @Get('/:id/:optional?')
    // public getUsers(
    //     @Param('id') id: any, 
    //     @Query('limit') limit: any
    // ){
    //     console.log({id,limit});
    //     return `You send a request to get the user list`
    // }

    /**1 */
    // @Get('/:id/:optional?')
    // public getUsers(@Param() params: any, @Query() query: any){
    //     return `You send a request to get the user list params => ${JSON.stringify(params)} query => ${JSON.stringify(query)}`
    // }
}
