import { NextFunction, Request, Response } from 'express';
import { LeadInteractor } from '../interactors';
import { LeadRepository } from '../repositories';
import { plainToInstance } from 'class-transformer';
import { CreateLeadDto, LeadFilterDto } from '../common/dtos';
import { MethodBinder } from '../utils';

export class LeadController {
  private leadInteractor: LeadInteractor;
  private leadRepository: LeadRepository;

  constructor() {
    MethodBinder.bind(this);
    this.leadRepository = new LeadRepository();
    this.leadInteractor = new LeadInteractor(this.leadRepository);
  }

  async createLead(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const dto = plainToInstance(CreateLeadDto, req.body);
      const response = await this.leadInteractor.createLead(dto);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getAllLeads(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const spage = req.query.page as string;
      let page: number | undefined;
      if (spage && parseInt(spage)) {
        page = parseInt(spage);
      }
      const response = await this.leadInteractor.getAllLeads(page);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async filterLeads(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const dto = plainToInstance(LeadFilterDto, req.query);
      const response = await this.leadInteractor.filterLead(dto);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
}
