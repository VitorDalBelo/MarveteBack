import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService } from 'config/database';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'public'),
    }),
  ConfigModule.forRoot({
    isGlobal:true
  }),
  TypeOrmModule.forRootAsync({
    useClass: DatabaseConfigService,
    inject: [DatabaseConfigService]
  }),
  UsersModule,
  AuthModule,
],
  controllers: [],
  providers: [],
})
export class AppModule {}
