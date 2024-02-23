import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { BasicAuthStrategy } from './strategies/basic.strategy';
import { JwtAuthStrategy } from './strategies/jwt.strategy';
import { GoogleApiKeyStrategy } from './strategies/google_apiKey.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessToken } from './entities/access-token.entity';
import "dotenv/config"

@Module({
    imports:[UsersModule,PassportModule,JwtModule.register({
      signOptions:{expiresIn:"3600s"},
      secret:process.env.JWT_SECRET,
    }),
    TypeOrmModule.forFeature([AccessToken])
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtAuthStrategy,BasicAuthStrategy,GoogleApiKeyStrategy],
})
export class AuthModule {}
