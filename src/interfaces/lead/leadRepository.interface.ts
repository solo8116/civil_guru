import { LeadEntity } from '../../entites';

export interface ILeadRepository {
  create(lead: LeadEntity): Promise<void>;
}
