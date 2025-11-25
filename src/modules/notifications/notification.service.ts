import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { db } from "src/lib/db";
import { notifications } from "src/lib/db/schema";

@Injectable()
export class NotificationService {
    async sendNotification(userId: string, type: "system" | "ping" | "message", content: string)
    {
        return (await db.insert(notifications).values({userId, type, content}).returning());
    }

    async getUserNotifications(userId: string)
    {
        return (await db.select().from(notifications).where(eq(notifications.userId, userId)))
    }
}