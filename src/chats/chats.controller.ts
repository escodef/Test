import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { FindChatsDto } from './dto/find-chats.dto';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post('add')
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatsService.create(createChatDto);
  }
  
  @Post('get')
  findChats(@Body() findChatsDto: FindChatsDto) {
    return this.chatsService.findChat(findChatsDto);
  }
}
