import { PaginationInterface } from '../../domain/interfaces/pagination/paginationInterface';

export default function BuildPagination(
  limit: number,
  offset: number,
  totalRecords: number
): PaginationInterface {
  const recordPerPage = limit;
  const currentPage = Math.ceil(offset / limit) + 1;
  const totalPage = Math.ceil(totalRecords / limit);
  const hasNextPage = currentPage < totalPage;

  return {
    hasNextPage,
    currentPage,
    totalPage,
    recordPerPage,
    totalRecords
  };
}
