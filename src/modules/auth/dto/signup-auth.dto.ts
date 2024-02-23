import { ApiProperty } from '@nestjs/swagger';
import * as Yup from 'yup';


enum StatusCode {
    OK = 200,
    BADREQUEST = 400,
    INTERNALERROR = 500,
  
  }

export class SignupAuthDto{
    @ApiProperty()
    name:string;
    @ApiProperty()
    email:string;
    @ApiProperty()
    password:string;

    public static schema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Email must be valid').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    public static async validate(value: any,options?: Yup.ValidateOptions<Yup.AnyObject>) : Promise<{statusCode: StatusCode, message:string}>{
        return SignupAuthDto.schema.validate(value,options)
        .then(()=>({statusCode:200,message:""}))
        .catch(err=>{
          if (err instanceof Yup.ValidationError) {
            return {
              statusCode: 400,
              message: err.errors[0],
            };
          } else {
            return {
              statusCode: 500,
              message: 'An unexpected error occurred.',
            };
          }
        })
    }

}