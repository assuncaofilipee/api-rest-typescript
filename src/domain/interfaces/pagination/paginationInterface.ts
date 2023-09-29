export interface PaginationInterface {
  hasNextPage: boolean;
  currentPage: number;
  totalPage: number;
  recordPerPage: number;
  totalRecords: number;
}