import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { FindChatsDto } from './dto/find-chats.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { In, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatsRepository: Repository<Chat>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createChatDto: CreateChatDto) {
    const users: User[] = await this.userRepository.findBy({
      id: In(createChatDto.users),
    });
    const chat: Chat = this.chatsRepository.create({
      users,
      name: createChatDto.name,
    });
    await this.chatsRepository.save(chat);
    return chat.id;
  }
  async findChat(findChatsDto: FindChatsDto) {
    const user: User = await this.userRepository.findOne({
      where: { id: findChatsDto.user },
      order: { created_at: 'ASC' },
      relations: ['chats'],
    });
    return user.chats;
  }
}
