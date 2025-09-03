import { IResponse } from '../response';

export interface ILeadInteractor {
  createLead(data: any): Promise<IResponse>;
}
