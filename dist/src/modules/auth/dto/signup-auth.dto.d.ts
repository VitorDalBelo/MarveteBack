import * as Yup from 'yup';
declare enum StatusCode {
    OK = 200,
    BADREQUEST = 400,
    INTERNALERROR = 500
}
export declare class SignupAuthDto {
    name: string;
    email: string;
    password: string;
    static schema: Yup.ObjectSchema<{
        name: string;
        email: string;
        password: string;
    }, Yup.AnyObject, {
        name: undefined;
        email: undefined;
        password: undefined;
    }, "">;
    static validate(value: any, options?: Yup.ValidateOptions<Yup.AnyObject>): Promise<{
        statusCode: StatusCode;
        message: string;
    }>;
}
export {};
