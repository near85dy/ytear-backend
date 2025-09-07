import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin, bearer, jwt, openAPI, username } from 'better-auth/plugins';
import { db } from './db';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  plugins: [admin(), bearer(), jwt(), username(), openAPI()],
  emailAndPassword: { enabled: true },
});
