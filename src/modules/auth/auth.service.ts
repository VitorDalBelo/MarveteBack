import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { GoogleCredentialsDto } from './dto/google-credentials.dto';
import { GoogleUserDto } from './dto/google-user.dto';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessToken } from './entities/access-token.entity';
import axios from 'axios';
import "dotenv/config"

@Injectable()
export class AuthService {

  constructor(
    private usersService : UsersService,
    private  jwtService : JwtService ,
    @InjectRepository(AccessToken)
    private readonly accessTokenRepository : Repository<AccessToken>
  ){}
  async validadeUser(email: string, password: string) {
      const user = await this.usersService.findOne(email);
      if(!user) throw new UnauthorizedException("Email or password incorrect");
      if(user.hashpassword){
        const hashValidate = await bcrypt.compare(password , user.hashpassword).catch(e=> {throw new UnauthorizedException("Email or password incorrect")} )
        if(!hashValidate) throw new UnauthorizedException("Email or password incorrect");
      }
      else throw new ForbiddenException("The account is a google accont");
      return user;
  }
  async signup(signupAuthDto: SignupAuthDto) {
    const user = {
      name:signupAuthDto.name,
      email:signupAuthDto.email,
      hashpassword: await bcrypt.hash(signupAuthDto.password,10)
    };

    const newUser:any =  await this.usersService.create(user);
    newUser.googleAccont = false;

    return await this.login(newUser);
  }

  async googleSignup(googleCredentials : GoogleCredentialsDto){
    if(!googleCredentials.refresh_token){
      new BadRequestException(`
      The response from the Google server does not contain the field refresh_token, so it is necessary to configure the parameter access_type as offline when the user is redirected to the authentication server.
      `)
    } 
    const googleUser = this.jwtService.decode(googleCredentials.id_token) as GoogleUserDto;
    if(!googleUser.email) throw new BadRequestException("Email field is missing, change the parameters when redirecting the user to the goole authentication server");
    const user : DeepPartial<User> = {
      email:googleUser.email,
      name:googleUser.name,
      googleRefreshToken:googleCredentials.refresh_token
    }

    const newUser:any = await this.usersService.create(user);
    newUser.googleAccont = true;
    newUser.photo = googleUser.picture;

    return await this.login(newUser);
  }


  async login(user:User) {
    const {hashpassword,googleRefreshToken,...getUserDto} = user;
    const response ={
      access_token: this.jwtService.sign(getUserDto),
      user:getUserDto
    }

    const accessTokenEntity:AccessToken =  this.accessTokenRepository.create({token:response.access_token,user_id:user.user_id});

     this.accessTokenRepository.insert(accessTokenEntity)
     .catch(()=>{
      this.accessTokenRepository.update(user.user_id,{token:response.access_token})
      .catch(e=>console.log(e))
     })

    return response;
  }

  async googleLogin(googleCredentials: GoogleCredentialsDto) {
    let googleUser = this.jwtService.decode(googleCredentials.id_token) as GoogleUserDto;
    if(!googleUser.email) throw new BadRequestException("Email field is missing, change the parameters when redirecting the user to the goole authentication server");
    const user : any = await this.usersService.findOne(googleUser.email);
    if(!user) throw new NotFoundException("We didn't recognize that account");
    user.googleAccont = true;

    if(!googleUser.picture){
      user.googleRefreshToken
      const url = `https://oauth2.googleapis.com/token?client_id=${process.env.GOOGLE_ID}&client_secret=${process.env.GOOGLE_SECRET}&refresh_token=${user.googleRefreshToken}&grant_type=refresh_token`
      await axios.post(url)
      .then( async resp=>{
        
        await axios.get("https://www.googleapis.com/userinfo/v2/me",{headers:{Authorization:`Bearer ${resp.data.access_token}`}})
        .then(resp=> googleUser = resp.data)
        .catch(()=>console.log("erro 2 "))
      })
      .catch(()=>console.log("erro 1 ",url,user))
    }
    user.photo = googleUser.picture;
    user.name =  googleUser.name;
    return await this.login(user)

  }

  async refresh(oldToken:string)  {
    const token = await this.jwtService.verifyAsync(oldToken)
    .then(async resp=>{
      const {iat,exp,...user} = this.jwtService.decode(oldToken) as any;
      return {
        access_token: oldToken ,
        user
      }
    })
    .catch(async e=>{
      return null
    })

    if(false) return token
    else{
      const accessTokenEntity : AccessToken = await this.accessTokenRepository.findOne({where:{token:oldToken},relations:["user_id"],relationLoadStrategy:"query"});
      if(!accessTokenEntity || !accessTokenEntity.user_id) throw new NotFoundException("No users found with this email");
      const user = accessTokenEntity.user_id as User;
      if(!user.hashpassword && user.googleRefreshToken){
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `https://oauth2.googleapis.com/token?client_id=${process.env.GOOGLE_ID}&client_secret=${process.env.GOOGLE_SECRET}&refresh_token=${user.googleRefreshToken}&grant_type=refresh_token`,
          headers: { }
        };
        
       return  await axios.request(config)
        .then(async (response) => {
         return await this.googleLogin(response.data as GoogleCredentialsDto)
        })
        .catch((error) => {
          console.log(error);
          throw new InternalServerErrorException();
        });
      }
      else return await this.login(user);
    }
  }


}




