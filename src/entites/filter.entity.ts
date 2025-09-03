import { FilterOperator } from '../common/enums';

export class FilterEntity<T> {
  q?: string;
  page: number = 1;
  operator: FilterOperator = FilterOperator.AND;
  filters?: Partial<T>;
  take: number = 10;
}
