import {
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Interest, Qualification, Source, Status } from '../../enums';
import { BaseFilterDto } from '../baseFilter.dto';

export class LeadFilterDto extends BaseFilterDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(10)
  phone?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(10)
  alternatePhone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(Status, { always: true })
  status?: Status;

  @IsOptional()
  @IsEnum(Qualification, { always: true })
  qualification?: Qualification;

  @IsOptional()
  @IsEnum(Interest, { always: true })
  interestField?: Interest;

  @IsOptional()
  @IsEnum(Source, { always: true })
  source?: Source;

  @IsOptional()
  @IsString()
  assignedTo?: string;

  @IsOptional()
  @IsEnum(Interest, { always: true })
  jobInterest?: Interest;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  passoutYear?: number;

  @IsOptional()
  @IsString()
  heardFrom?: string;
}
