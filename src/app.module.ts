import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ChatsModule } from './chats/chats.module';
import { MessagesModule } from './messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './messages/entities/message.entity';
import { Chat } from './chats/entities/chat.entity';
import { User } from './users/entities/user.entity';

@Module({
  imports: [UsersModule, ChatsModule, MessagesModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'JNKei023dsp0i32',
    database: 'postgres',
    entities: [Message, Chat, User],
    synchronize: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
