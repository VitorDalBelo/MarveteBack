import { AuthService } from './auth.service';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    create(singupAuthDto: SignupAuthDto): Promise<{
        access_token: string;
        user: {
            user_id: number;
            name: string;
            email: string;
            photo: string;
        };
    }>;
    signupGoogle(req: Request): Promise<{
        access_token: string;
        user: {
            user_id: number;
            name: string;
            email: string;
            photo: string;
        };
    }>;
    loginGoogle(req: Request): Promise<{
        access_token: string;
        user: {
            user_id: number;
            name: string;
            email: string;
            photo: string;
        };
    }>;
    login(req: Request): Promise<{
        access_token: string;
        user: {
            user_id: number;
            name: string;
            email: string;
            photo: string;
        };
    }>;
    refresh(req: Request): Promise<any>;
}
