export interface PagedResponse<T> {
  items: T[];
  totalItems: number;
  page: number;
  limit: number;
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
