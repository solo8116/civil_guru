import { CreateLeadDto } from '../common/dtos';
import { LeadEntity } from '../entites';
import { ILeadRepository, IResponse } from '../interfaces';
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
}
