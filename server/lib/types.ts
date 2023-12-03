export interface Meta {
  page: number;
  limit: number;
  pagesCount: number;
  itemsCount: number;
}

export interface PagedResponse<T> {
  items: T[];
  meta: Meta;
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
