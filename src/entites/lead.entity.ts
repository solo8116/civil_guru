import { Interest, Qualification, Source, Status } from '../common/enums';

export class LeadEntity {
  _id?: string;
  name: string;
  phone: string;
  alternatePhone?: string;
  email: string;
  status: Status;
  qualification: Qualification;
  interestField: Interest;
  source: Source;
  assignedTo: string;
  jobInterest: Interest;
  state: string;
  city: string;
  passoutYear: number;
  heardFrom?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(values: LeadEntity) {
    Object.assign(this, values);
  }
}
