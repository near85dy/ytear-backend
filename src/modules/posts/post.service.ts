import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from 'src/lib/db';
import { posts } from 'src/lib/db/schema';

@Injectable({})
export class PostService {
  async post(userId: string, content: string) {
    return await db.insert(posts).values({ userId, content }).returning();
  }

  async getUserPosts(userId: string) {
    return await db.select().from(posts).where(eq(posts.userId, userId));
  }

  async getPostById(id: string) {
    return await db.select().from(posts).where(eq(posts.id, id));
  }

  async deletePost(userId: string, postId: string): Promise<Object> {
    const post = (await db.select().from(posts).where(eq(posts.id, postId)))[0];
    if (!post) return { message: 'Post not found' };
    if (post.userId !== userId) return { message: 'Unauthorized' };

    await db.delete(posts).where(eq(posts.id, postId));

    return { message: 'Post deleted', post };
  }
}
