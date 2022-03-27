import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatRoom } from 'server/entities/chat_room.entity';
import { ChatRoomsService } from 'server/providers/services/chat_rooms.service';
import * as crypto from 'crypto';

class ChatRoomBody {
  name: string;
  latitude: number;
  longitude: number;
}

@Controller()
export class ChatRoomsController {
    constructor(private chatRoomsService: ChatRoomsService) {}

    @Get('/chat_rooms')
    async index() {
        const chatRooms = await this.chatRoomsService.findAll();
        return { chatRooms };
    }

    @Post('/chat_rooms/')
    async create(@Body() body: ChatRoomBody){
        let chatRoom = new ChatRoom();
        chatRoom.name = body.name;
        chatRoom.latitude = body.latitude;
        chatRoom.longitute = body.longitude;
        chatRoom.roomkey = crypto.randomBytes(8).toString('hex');
        chatRoom = await this.chatRoomsService.create(chatRoom);
    }
}