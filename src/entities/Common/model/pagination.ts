export interface Pagination<T> {
  items: T[];
  metadata: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
}
