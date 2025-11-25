import { Body, Controller, Get, HttpException, Post, Res, UseGuards } from "@nestjs/common";
import { AuthGuard, Session, UserSession } from "@thallesp/nestjs-better-auth";
import { ChatService } from "./chat.service";
import { db } from "src/lib/db";
import { chat, user } from "src/lib/db/schema";
import { and, eq, or } from "drizzle-orm";

@Controller("chats")
export class ChatController {
    constructor(private chatService: ChatService) {}

    @UseGuards(AuthGuard)
    @Post()
    async createChat(@Session() session: UserSession, @Body() body, @Res() res)
    {
        const userId = session.user.id;
        const { companion } = body;
        if((await db.select().from(user).where(eq(user.id, companion))).length == 0) throw new HttpException("Companion not found", 404);
        const existingChat = await db.select().from(chat).where(
            or(
                and(
                eq(chat.user1, userId),
                eq(chat.user2, companion)
                ),
                and(
                eq(chat.user1, companion),
                eq(chat.user2, userId)
                )
            )
        );
        if(existingChat.length != 0) throw new HttpException("You already have chat with this user", 400);
        const createdChat = this.chatService.createChat(userId, companion);
        return res.send(createdChat)
    }

    @UseGuards(AuthGuard)
    @Get("/me")
    async getUserChats(@Session() session: UserSession, @Res() res)
    {
        const userId = session.user.id;
        const chats = await this.chatService.getUserChats(userId);
        return res.send(chats)
    }
}