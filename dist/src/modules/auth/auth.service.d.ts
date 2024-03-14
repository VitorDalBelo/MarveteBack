import { UsersService } from '../users/users.service';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { GoogleCredentialsDto } from './dto/google-credentials.dto';
import { Repository } from 'typeorm';
import { AccessToken } from './entities/access-token.entity';
import "dotenv/config";
export declare class AuthService {
    private usersService;
    private jwtService;
    private readonly accessTokenRepository;
    constructor(usersService: UsersService, jwtService: JwtService, accessTokenRepository: Repository<AccessToken>);
    validadeUser(email: string, password: string): Promise<User>;
    signup(signupAuthDto: SignupAuthDto): Promise<{
        access_token: string;
        user: {
            user_id: number;
            name: string;
            email: string;
            photo: string;
        };
    }>;
    googleSignup(googleCredentials: GoogleCredentialsDto): Promise<{
        access_token: string;
        user: {
            user_id: number;
            name: string;
            email: string;
            photo: string;
        };
    }>;
    login(user: User): Promise<{
        access_token: string;
        user: {
            user_id: number;
            name: string;
            email: string;
            photo: string;
        };
    }>;
    googleLogin(googleCredentials: GoogleCredentialsDto): Promise<{
        access_token: string;
        user: {
            user_id: number;
            name: string;
            email: string;
            photo: string;
        };
    }>;
    refresh(oldToken: string): Promise<any>;
}
