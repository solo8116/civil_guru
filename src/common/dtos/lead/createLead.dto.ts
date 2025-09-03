import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Interest, Qualification, Source, Status } from '../../enums';

export class CreateLeadDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(10)
  phone: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(10)
  alternatePhone?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEnum(Status, { always: true })
  status: Status;

  @IsNotEmpty()
  @IsEnum(Qualification, { always: true })
  qualification: Qualification;

  @IsNotEmpty()
  @IsEnum(Interest, { always: true })
  interestField: Interest;

  @IsNotEmpty()
  @IsEnum(Source, { always: true })
  source: Source;

  @IsNotEmpty()
  @IsString()
  assignedTo: string;

  @IsNotEmpty()
  @IsEnum(Interest, { always: true })
  jobInterest: Interest;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  passoutYear: number;

  @IsOptional()
  @IsString()
  heardFrom?: string;
}
