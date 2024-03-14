import { User } from './entities/user.entity';
import { DeepPartial, Repository } from 'typeorm';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create(user: DeepPartial<User>): Promise<User>;
    findAll(): string;
    findOne(email: string): Promise<User>;
    remove(id: number): string;
}
