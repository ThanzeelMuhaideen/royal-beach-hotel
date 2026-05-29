import 'dotenv/config';
import { defineConfig } from '@prisma/config';

export default defineConfig({
  // 1. Schema is a string pointing to the file
  schema: "prisma/schema.prisma",
  
  // 2. Datasource is its own separate block
  datasource: {
    url: process.env.DATABASE_URL,
  },
});