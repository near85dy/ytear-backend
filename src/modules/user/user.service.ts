import { Injectable } from '@nestjs/common';
import { eq, ilike } from 'drizzle-orm';
import { db } from 'src/lib/db';
import { user } from 'src/lib/db/schema';

export interface PublicUser {
  id: string;
  username: string;
  name: string;
  surname: string;
}

@Injectable()
export class UserService {
  async getUserById(id: string): Promise<PublicUser | undefined> {
    return (await db.query.user.findFirst({
      columns: {
        id: true,
        username: true,
        name: true,
        surname: true,
        image: true,
        birthday: true,
      },
      where: eq(user.id, id),
    })) as PublicUser | undefined;
  }

  filterAllowedFields(data: Record<string, any>, allowed: string[]) {
    return Object.fromEntries(
      Object.entries(data).filter(([key]) => allowed.includes(key) && data[key] !== undefined)
    );
  }

  async updateUser(id: string, userData: {name?: string, surname?: string, image?: string})
  {
    const result = await db
      .update(user)
      .set(userData)
      .where(eq(user.id, id))
      .returning();

    return result[0];
  }

  async getUserByUsername(username: string)
  {
    return (await db.query.user.findMany({columns: {
        id: true,
        username: true,
        name: true,
        surname: true,
        image: true,
        birthday: true,
      },
      where: ilike(user.username, `${username}%`), limit: 10})) as PublicUser[] | undefined;
  }
}
