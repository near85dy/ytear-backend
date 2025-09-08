import { Controller, Get, Param, Patch, Res, UseGuards } from '@nestjs/common';
import { AuthGuard, Session, UserSession } from '@thallesp/nestjs-better-auth';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  async getCurrentUser(@Session() session: UserSession) {
    return session.user;
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<Object> {
    const user = (await this.userService.getUserById(id))[0];

    if (!user) return { message: 'User not found' };

    return user;
  }
}
