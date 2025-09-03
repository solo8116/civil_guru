import { Router } from 'express';
import { LeadController } from '../controllers';
import { ValidationMiddleware } from '../middlewares';
import { CreateLeadDto, LeadFilterDto } from '../common/dtos';

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
      new ValidationMiddleware(CreateLeadDto, 'body').validate,
      this.leadController.createLead,
    );
    this.router.get('/', this.leadController.getAllLeads);
    this.router.get(
      '/filter',
      new ValidationMiddleware(LeadFilterDto, 'query').validate,
      this.leadController.filterLeads,
    );
  }
}
