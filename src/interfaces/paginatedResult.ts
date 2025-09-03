export interface IPaginatedResult<T> {
  totalPages: number;
  totalItems: number;
  data: T[];
}
