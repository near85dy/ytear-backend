import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, UserSession, Session } from '@thallesp/nestjs-better-auth';
import { PostService } from './post.service';

@Controller()
export class PostController {
  constructor(private postService: PostService) {}

  @Post('posts')
  @UseGuards(AuthGuard)
  async createPost(
    @Session() session: UserSession,
    @Body() body: { content: string },
  ) {
    const userId = session.user.id;
    const post = (await this.postService.post(userId, body.content))[0];
    return post;
  }

  @Get('posts/:id')
  async getPostById(@Param('id') postId: string) {
    return await this.postService.getPostById(postId);
  }

  @UseGuards(AuthGuard)
  @Get('users/me/posts')
  async getCurrentUserPosts(@Session() session: UserSession) {
    const userId: string = session.user.id;
    return await this.postService.getUserPosts(userId);
  }

  @Get('users/:id/posts')
  async getUserPosts(@Param('id') userId: string) {
    return await this.postService.getUserPosts(userId);
  }

  @UseGuards(AuthGuard)
  @Delete('posts/:id')
  async deletePost(
    @Session() session: UserSession,
    @Param('id') postId: string,
  ) {
    const userId = session.user.id;
    return await this.postService.deletePost(userId, postId);
  }
}
