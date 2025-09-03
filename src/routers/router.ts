import { Application, Router } from 'express';
import { LeadRouter } from './lead.router';
import { GlobalErrorMiddleware, PrismaErrorMiddleware } from '../middlewares';

export class Routes {
  private leadRouter: LeadRouter;

  constructor(private app: Application) {
    this.leadRouter = new LeadRouter();

    this.app.use('/api/lead', this.leadRouter.router);
    this.app.use(PrismaErrorMiddleware.handle);
    this.app.use(GlobalErrorMiddleware.handle);
  }
}
