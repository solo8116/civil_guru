import { Prisma, PrismaClient } from '@prisma/client';
import { ILeadRepository, IPaginatedResult } from '../interfaces';
import { FilterEntity, LeadEntity } from '../entites';

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
    const totalLeads = await this.countLead();
    const leads = (await this.prisma.lead.findMany({
      take,
      skip: (page - 1) * take,
    })) as LeadEntity[];

    return {
      totalPages: Math.ceil(totalLeads / take),
      totalItems: totalLeads,
      data: leads,
    };
  }

  async countLead(options?: Prisma.LeadCountArgs): Promise<number> {
    return await this.prisma.lead.count(options);
  }

  async search(
    filterOptions: FilterEntity<LeadEntity>,
  ): Promise<IPaginatedResult<LeadEntity>> {
    const { filters, operator, page, q, take } = filterOptions;
    const filterQuery: Prisma.LeadWhereInput = {};

    if (q) {
      filterQuery.OR = [
        { name: { contains: q } },
        { email: { contains: q } },
        { phone: { contains: q } },
        { alternatePhone: { contains: q } },
        { city: { contains: q } },
        { heardFrom: { contains: q } },
        { assignedTo: { contains: q } },
      ];
    }

    if (filters) {
      const filterConditions = Object.entries(filters).map(([key, value]) => ({
        [key]: value,
      }));

      if (operator === 'AND') filterQuery.AND = filters;
      else filterQuery.OR = [...(filterQuery.OR ?? []), ...filterConditions];
    }

    const totalLeads = await this.countLead({ where: filterQuery });
    const totalPages = Math.ceil(totalLeads / take);
    const leads = (await this.prisma.lead.findMany({
      where: filterQuery,
      take,
      skip: (page - 1) * take,
    })) as LeadEntity[];

    return {
      totalItems: totalLeads,
      totalPages: totalPages,
      data: leads,
    };
  }
}
