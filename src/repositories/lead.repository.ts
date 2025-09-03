import { PrismaClient } from '@prisma/client';
import { ILeadRepository } from '../interfaces';
import { LeadEntity } from '../entites';

export class LeadRepository implements ILeadRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(lead: LeadEntity): Promise<void> {
    await this.prisma.lead.create({
      data: lead,
    });
  }
}
