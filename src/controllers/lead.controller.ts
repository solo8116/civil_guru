import { NextFunction, Request, Response } from 'express';
import { LeadInteractor } from '../interactors';
import { LeadRepository } from '../repositories';
import { plainToInstance } from 'class-transformer';
import { CreateLeadDto } from '../common/dtos';
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
}
