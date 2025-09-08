import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from 'src/lib/db';
import { user } from 'src/lib/db/schema';

@Injectable({})
export class UserService {
  async getUserById(id: string): Promise<Object> {
    return await db.select().from(user).where(eq(user.id, id));
  }
}
