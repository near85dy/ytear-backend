import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin, bearer, jwt, openAPI, username } from 'better-auth/plugins';
import { db } from './db';

export const auth = betterAuth({
  user: {
    additionalFields: {
      username: {
        type: 'string',
        required: true,
        input: true,
      },
      surname: {
        type: 'string',
        required: true,
        input: true,
      },
      birthday: {
        type: 'date',
        required: true,
        input: true,
      },
      image: {
        type: 'string',
        required: false,
      },
    },
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  plugins: [admin(), bearer(), jwt(), username(), openAPI()],
  emailAndPassword: { enabled: true },
});
