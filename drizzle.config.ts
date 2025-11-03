import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  dbCredentials: {
    url: String(process.env.DATABASE_URL),
  },
  schema: './src/lib/db/schema.ts',
  out: './drizzle',
});
