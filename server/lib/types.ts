export interface PagedResult<T> {
  items: T[];
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}
