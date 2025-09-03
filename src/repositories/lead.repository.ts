import { Prisma, PrismaClient } from '@prisma/client';
import { ILeadRepository, IPaginatedResult } from '../interfaces';
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

  async getAll(
    take: number = 10,
    page: number = 1,
  ): Promise<IPaginatedResult<LeadEntity>> {
    const totalLeads = await this.countLead({
      take,
      skip: (page - 1) * take,
    });
    const leads = (await this.prisma.lead.findMany({
      take,
      skip: (page - 1) * take,
    })) as LeadEntity[];

    return {
      totalPages: totalLeads / take,
      totalItems: totalLeads,
      data: leads,
    };
  }

  async countLead(options?: Prisma.LeadCountArgs): Promise<number> {
    return await this.prisma.lead.count(options);
  }
}
