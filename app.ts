import express, { type Application } from 'express';
import { Server } from './src/server';
import { PrismaClient } from '@prisma/client';

const app: Application = express();
new Server(app);
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const prisma = new PrismaClient();

async function startServer() {
  try {
    await prisma.$connect();
    console.log('connected to database');
    app.listen(PORT, () => {
      console.log(`server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database', error);
  }
}

startServer();
