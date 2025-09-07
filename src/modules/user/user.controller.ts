import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard, Session, UserSession } from '@thallesp/nestjs-better-auth';
import { session } from 'src/lib/db/schema';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  @Get('me')
  async getCurrentUser(@Session() session: UserSession) {
    return session.user;
  }

  @Patch('me')
  async updateUserInfo(@Session() session: UserSession) {}
}
