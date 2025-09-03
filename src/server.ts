import cors, { CorsOptions } from 'cors';
import express, { Application } from 'express';
import { Routes } from './routers/router';

export class Server {
  constructor(private app: Application) {
    this.config();
    new Routes(app);
  }

  private config(): void {
    const corsOptions: CorsOptions = {
      origin: '*',
    };

    this.app.use(cors(corsOptions));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
}
