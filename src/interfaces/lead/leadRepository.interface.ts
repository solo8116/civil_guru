import { FilterEntity, LeadEntity } from '../../entites';
import { IPaginatedResult } from '../paginatedResult';

export interface ILeadRepository {
  create(lead: LeadEntity): Promise<void>;
  getAll(take?: number, page?: number): Promise<IPaginatedResult<LeadEntity>>;
  search(
    filters: FilterEntity<LeadEntity>,
  ): Promise<IPaginatedResult<LeadEntity>>;
}
