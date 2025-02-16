import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {

    constructor(
        @Inject(forwardRef(()=>UsersService))
        private readonly usersService: UsersService
    ){
        //
    }

    public login(email: string, password: string, id: string){
        //check user exists in db
        const users = this.usersService.findOneById('1234');
        //login
        //token
        return "Sample token"
    }

    public isAuth(){
        return true;
    }
}
