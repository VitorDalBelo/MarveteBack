import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeepPartial, QueryFailedError, Repository } from 'typeorm';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository : Repository<User>
  ){}

  async create(user: DeepPartial<User> ) : Promise<User>{
    
    return await this.userRepository.save(user)
    .then(newUser=>newUser)
    .catch(error=>{
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('Email already exists.');
      } 
      else throw error;
    })
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(email: string) {
    return await this.userRepository.findOne({where:{email}});
  }


  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
