import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Patch,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, Session, UserSession } from '@thallesp/nestjs-better-auth';
import { UserService, PublicUser } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  async getCurrentUser(@Session() session: UserSession) {
    return session.user;
  }

  filterAllowedFields(data: Record<string, any>, allowed: string[]) {
    return Object.fromEntries(
      Object.entries(data).filter(([key]) => allowed.includes(key) && data[key] !== undefined)
    );
  }

  @Put('me')
  @UseGuards(AuthGuard)
  async updateUser(@Body() body, @Session() session: UserSession, @Res() res)
  {
    if(!body) return res.status(400).send({message: "Bad request"});

    const dataToUpdate = this.filterAllowedFields(body, ['name', 'surname']);

    dataToUpdate.updatedAt = new Date();
    return res.send(await this.userService.updateUser(session.user.id, dataToUpdate));
  }

  @Get("find")
  async findUser(@Query("username") username: string, @Query("id") id: string): Promise<PublicUser[]>
  {
    if(!id)
    {
      const users = await this.userService.getUserByUsername(username);
      if(!users) throw new HttpException('User not found', 404)
      return users
    }
    else
    {
      console.log(id)
      const users = await this.userService.getUserById(id)
      console.log(users)
      if(!users) throw new HttpException('User not found', 404)
      return [users]
    }

  }

  // TODO: Delete this after frontend update
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<Object> {
    const user = await this.userService.getUserById(id);

    if (!user) throw new HttpException('User not found', 404);

    return user;
  }
}
