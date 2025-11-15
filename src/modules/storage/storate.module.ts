import { Module } from "@nestjs/common";
import { StorageService } from "./storate.service";
import { StorageController } from "./stotage.controller";
import { UserService } from "../user/user.service";

@Module({
    controllers: [StorageController],
    providers: [StorageService, UserService],
})
export class StorageModule {}