import { defineConfig } from 'drizzle-kit';

console.log(process.env.DATABASE_URL);
export default defineConfig({
  dialect: 'postgresql',
  dbCredentials: {
    url: String(process.env.DATABASE_URL),
  },
  schema: './src/lib/db/schema.ts',
  out: './drizzle',
});
