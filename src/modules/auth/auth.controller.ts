import { Controller,Post, Body, BadRequestException, InternalServerErrorException, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiExtraModels, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { BadRequest, Conflict, Forbidden, InternalServerError, LoginOk, Unauthorized, UserCreated } from 'src/serverResponses/responses';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from '../users/entities/user.entity';
import { GetAccessTokenDto } from './dto/get-access_token-auth.dto';
import { GoogleCredentialsDto } from './dto/google-credentials.dto';

@ApiTags("auth")
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    ) {}

  @ApiExtraModels(GetAccessTokenDto)
  @ApiResponse(UserCreated)
  @ApiResponse(BadRequest)
  @ApiResponse(InternalServerError)
  @ApiResponse(Conflict)
  @Post("signup")
  async create(@Body() singupAuthDto: SignupAuthDto) {

    const validation = await SignupAuthDto.validate(singupAuthDto);

    if(validation.statusCode === 400) throw new BadRequestException(validation.message);
    if(validation.statusCode === 500) throw new InternalServerErrorException(validation.message);

    return await this.authService.signup(singupAuthDto)
  }

  @ApiExtraModels(GetAccessTokenDto)
  @ApiResponse(UserCreated)
  @ApiResponse(BadRequest)
  @ApiResponse(InternalServerError)
  @ApiResponse(Conflict)
  @UseGuards(AuthGuard("googlecode"))
  @ApiSecurity("googleLogin")
  @Post("signup/oauth")
  async signupGoogle(@Req() req: Request) {

    const credentials = req.user as GoogleCredentialsDto

    return await this.authService.googleSignup(credentials)
  }

  @ApiExtraModels(GetAccessTokenDto)
  @ApiResponse(LoginOk)
  @ApiResponse(BadRequest)
  @ApiResponse(Unauthorized)
  @ApiResponse(InternalServerError)
  @UseGuards(AuthGuard("googlecode"))
  @ApiSecurity("googleLogin")
  @Post("login/oauth")
  async loginGoogle(@Req() req: Request) {

    const credentials = req.user as GoogleCredentialsDto

    return await this.authService.googleLogin(credentials)
  }

  @UseGuards(AuthGuard('basic'))
  @ApiExtraModels(GetAccessTokenDto)
  @ApiResponse(LoginOk)
  @ApiResponse(Unauthorized)
  @ApiResponse(Forbidden)
  @ApiResponse(BadRequest)
  @ApiResponse(InternalServerError)
  @ApiSecurity("basic")
  @Post("login")
  async login(@Req() req : Request) {
    const user = req.user as User;
    return await this.authService.login(user);
  }


  @ApiSecurity('JWT')
  @ApiResponse(LoginOk)
  @ApiResponse(Unauthorized)
  @ApiResponse(Forbidden)
  @ApiResponse(BadRequest)
  @ApiResponse(InternalServerError)
  @Post("/refresh")
  async refresh(@Req() req : Request){
    const oldToken = req.headers.authorization.replace("Bearer ","");
    return await this.authService.refresh(oldToken);
  }

  // @ApiExtraModels(GetAccessTokenDto)
  // @ApiResponse(LoginOk)
  // @ApiResponse(Unauthorized)
  // @ApiResponse(InternalServerError)
  // @UseGuards(AuthGuard("googlecode"))
  // @ApiSecurity("googleLogin")
  // @Post("login/oauth")
  // async loginOauth(@Req() req : Request) {
  //   const credentials = req.user as GoogleCredentialsDto;
  //   return await this.authService.googleLogin(user);
  // }

}
