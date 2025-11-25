import { Module } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { NotificationController } from "./notification.controller";

@Module({
    imports: [],
    providers: [NotificationService],
    controllers: [NotificationController]
})
export class NotificationModule {

}