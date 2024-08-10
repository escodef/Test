import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { FindChatsDto } from './dto/find-chats.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { In, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatsRepository: Repository<Chat>,
    private readonly usersService: UsersService,
  ) {}
  async create(createChatDto: CreateChatDto) {
    const users: User[] = await this.usersService.findById(createChatDto.users)
    const chat: Chat = this.chatsRepository.create({
      users,
      name: createChatDto.name,
    });
    await this.chatsRepository.save(chat);
    return chat.id;
  }
  async findChatById(id: number): Promise<Chat> {
    const chat: Chat | null = await this.chatsRepository.findOne({
      where: {
        id,
      },
      relations: ['users'],
    });
    if (!chat) return null;
    return chat;
  }
  async findChat(findChatsDto: FindChatsDto) {
    const user: User = await this.usersService.findOneById(findChatsDto.user);
    return user.chats;
  }
}
