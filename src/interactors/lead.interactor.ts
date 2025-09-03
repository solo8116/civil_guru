import { TAKE_PAGES } from '../common/constants';
import { CreateLeadDto, LeadFilterDto } from '../common/dtos';
import { LeadEntity } from '../entites';
import { ILeadRepository, IPaginatedData, IResponse } from '../interfaces';
import { ILeadInteractor } from '../interfaces/lead/leadInteractor.interface';

export class LeadInteractor implements ILeadInteractor {
  constructor(private leadRepository: ILeadRepository) {}

  async createLead(dto: CreateLeadDto): Promise<IResponse> {
    const {
      assignedTo,
      city,
      email,
      interestField,
      jobInterest,
      name,
      passoutYear,
      phone,
      qualification,
      source,
      state,
      status,
      alternatePhone,
      heardFrom,
    } = dto;

    const lead = new LeadEntity({
      assignedTo,
      city,
      email,
      interestField,
      jobInterest,
      name,
      passoutYear,
      phone,
      qualification,
      source,
      state,
      status,
      alternatePhone,
      heardFrom,
    });

    await this.leadRepository.create(lead);

    return {
      success: true,
      message: 'lead created successfully',
    };
  }

  async getAllLeads(
    page: number = 1,
  ): Promise<IResponse<IPaginatedData<LeadEntity>>> {
    const result = await this.leadRepository.getAll(TAKE_PAGES, page);
    const nextPage = result.totalPages > page ? page + 1 : null;
    return {
      success: true,
      message: 'leads fetched successfully',
      data: {
        currentPage: page,
        nextPage,
        totalItems: result.totalItems,
        totalPages: result.totalPages,
        data: result.data,
      },
    };
  }

  async filterLead(
    dto: LeadFilterDto,
  ): Promise<IResponse<IPaginatedData<LeadEntity>>> {
    const { page, q, operator, ...filters } = dto;
    const result = await this.leadRepository.search({
      page,
      take: TAKE_PAGES,
      q,
      operator,
      filters,
    });
    const nextPage = result.totalPages > page ? page + 1 : null;
    return {
      success: true,
      message: 'leads filtered successfully',
      data: {
        currentPage: page,
        nextPage,
        totalItems: result.totalItems,
        totalPages: result.totalPages,
        data: result.data,
      },
    };
  }
}
