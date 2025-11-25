import { Injectable } from "@nestjs/common";
import { eq, or } from "drizzle-orm";
import { db } from "src/lib/db";
import { chat } from "src/lib/db/schema";

@Injectable({})
export class ChatService { 
    async createChat(id: string, companionId: string)
    {
        return await db.insert(chat).values({user1: id, user2: companionId})
    }

    async getUserChats(id: string)
    {
        const chats = await db.query.chat.findMany({where:                     or(
                        eq(chat.user1, id),
                        eq(chat.user2, id),
                    ), 
                    with: {
                        user1: true,
                        user2: true
                    }})
        return chats
    }
}