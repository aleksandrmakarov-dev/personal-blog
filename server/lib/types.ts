export interface PagedResult<T> {
  items: T[];
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface GenericErrorModelDTO {
  code: string;
  title: string;
  message: string;
}

export interface GenericResponseModelDTO {
  title: string;
  message: string;
}
