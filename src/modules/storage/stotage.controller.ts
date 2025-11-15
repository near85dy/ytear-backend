import { Controller, Get, Param, Post, Res, Session, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard, UserSession } from "@thallesp/nestjs-better-auth";
import { v7 as uuidv7 } from 'uuid';
import * as multer from 'multer'; 
import * as fs from 'fs';
import * as path from 'path';
import { Response } from "express";
import { db } from "src/lib/db";
import { user } from "src/lib/db/schema";
import { eq } from "drizzle-orm";
import { UserService } from "../user/user.service";

const AVATAR_DIR = "storage/avatars"

@Controller("storage")
export class StorageController {
    
    constructor(private readonly userService: UserService) {}

    @Get("/avatar/:id")
    async getAvatar(@Param("id") id: string, @Res() res: Response)
    {
        const avatarPath = path.join(process.cwd(), AVATAR_DIR, id)
        res.sendFile(avatarPath);
    }
    
    @UseGuards(AuthGuard) 
    @Post("avatar/upload")
    @UseInterceptors(FileInterceptor('file', {storage: multer.memoryStorage()}))
    async upload(@UploadedFile() file: Express.Multer.File, @Session() session: UserSession) { 
        const uploadDir = "storage/avatars";
        const uuid = uuidv7(); 
        const filePath = path.join(uploadDir, uuid);
        
        fs.promises.writeFile(filePath, file.buffer);

        const response = await this.userService.updateUser(session.user.id, {image: uuid})

        console.log(response);
        
        return { message: "File saved!", id: uuid };
    }
}