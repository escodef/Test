import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { FindMessagesDto } from './dto/find-messages.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { Chat } from 'src/chats/entities/chat.entity';
import { User } from 'src/users/entities/user.entity';
import { ChatsService } from 'src/chats/chats.service';


@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
    private readonly chatService: ChatsService
  ) {}
  async create(createMessageDto: CreateMessageDto) {
    const { chat: chatId, author, text } = createMessageDto;
    
    const chat: Chat | null = await this.chatService.findChatById(chatId);
    if(!chat) throw new NotFoundException('Chat not found');

    const user: User | null = chat.users.find((x) => x.id == author);
    if (!user) throw new NotFoundException('User is not in this chat');

    const message = this.messagesRepository.create({
      author: user,
      chat,
      text,
    });
    await this.messagesRepository.save(message);
    return message.id;
  }
  async findMessages(findMessagesDto: FindMessagesDto) {
    const { chat } = findMessagesDto;
    const messages: Message[] = await this.messagesRepository.find({
      where: { chat: { id: chat } },
      order: { created_at: 'ASC' },
    });
    return messages;
  }
}
