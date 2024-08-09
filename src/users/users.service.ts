import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) 
    private readonly usersRepository: Repository<User>
) {}
  async create(createUserDto: CreateUserDto) {
    const checkUser = await this.usersRepository.findOne({
      where: {
          username: createUserDto.username,
      },
    })
    if(checkUser) throw new BadRequestException('User already exists');
    const user = this.usersRepository.create(createUserDto);
    await this.usersRepository.save(user);
    return user.id;
  }
}
