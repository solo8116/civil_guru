import { LeadEntity } from '../../entites';
import { IPaginatedResult } from '../paginatedResult';

export interface ILeadRepository {
  create(lead: LeadEntity): Promise<void>;
  getAll(take?: number, page?: number): Promise<IPaginatedResult<LeadEntity>>;
}
