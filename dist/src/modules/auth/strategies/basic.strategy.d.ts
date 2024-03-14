import { AuthService } from "../auth.service";
declare const BasicAuthStrategy_base: new (...args: any[]) => any;
export declare class BasicAuthStrategy extends BasicAuthStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(email: string, password: string): Promise<any>;
}
export {};
