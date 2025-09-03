import { CreateLeadDto, LeadFilterDto } from '../../common/dtos';
import { LeadEntity } from '../../entites';
import { IPaginatedData } from '../paginatedData';
import { IResponse } from '../response';

export interface ILeadInteractor {
  createLead(dto: CreateLeadDto): Promise<IResponse>;
  getAllLeads(page?: number): Promise<IResponse<IPaginatedData<LeadEntity>>>;
  filterLead(
    dto: LeadFilterDto,
  ): Promise<IResponse<IPaginatedData<LeadEntity>>>;
}
