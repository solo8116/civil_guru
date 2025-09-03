import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import 'reflect-metadata';
import { FilterOperator } from '../enums';

export class BaseFilterDto {
  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @IsEnum(FilterOperator, { always: true })
  operator: FilterOperator = FilterOperator.AND;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @Min(1)
  page: number = 1;
}
