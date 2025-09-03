import { Router } from 'express';
import { LeadController } from '../controllers';
import { ValidationMiddleware } from '../middlewares';
import { CreateLeadDto } from '../common/dtos';

export class LeadRouter {
  public router: Router;
  private leadController: LeadController;

  constructor() {
    this.router = Router();
    this.leadController = new LeadController();

    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      '/',
      new ValidationMiddleware(CreateLeadDto).validate,
      this.leadController.createLead,
    );
    this.router.get('/', this.leadController.getAllLeads);
  }
}
