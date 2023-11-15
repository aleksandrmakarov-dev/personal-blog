export interface PagedResponse<T> {
  items: T[];
  totalItems: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GenericErrorModelDTO {
  message: string;
}
