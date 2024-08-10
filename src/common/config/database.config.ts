import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Chat } from "src/chats/entities/chat.entity";
import { Message } from "src/messages/entities/message.entity";
import { User } from "src/users/entities/user.entity";

registerAs('db', (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.POSTGRES_HOSTNAME,
    port: parseInt(process.env.PORT, 10),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [Message, Chat, User],
    synchronize: false,
}))