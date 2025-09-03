import { IPaginatedResult } from './paginatedResult';

export interface IPaginatedData<T> extends IPaginatedResult<T> {
  currentPage: number;
  nextPage: number | null;
}
