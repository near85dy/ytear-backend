import { Injectable } from '@nestjs/common';
import { User } from 'better-auth/*';
import { eq } from 'drizzle-orm';
import { db } from 'src/lib/db';
import { user } from 'src/lib/db/schema';

interface PublicUser {
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
      },
      where: eq(user.id, id),
    })) as PublicUser | undefined;
  }
}
