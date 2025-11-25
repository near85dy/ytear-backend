import { Controller, Get, UseGuards } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { AuthGuard, Session, UserSession } from "@thallesp/nestjs-better-auth";

@Controller()
export class NotificationController
{
    constructor(private notificationService: NotificationService) {}

    @UseGuards(AuthGuard)
    @Get("users/me/notifications")
    async getUserNotifications(@Session() session: UserSession)
    {
        const userId = session.user.id;
        return await this.notificationService.getUserNotifications(userId);
    }
} 