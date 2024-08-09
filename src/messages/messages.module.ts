import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Message } from './entities/message.entity';
import { Chat } from 'src/chats/entities/chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Message, Chat])],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
