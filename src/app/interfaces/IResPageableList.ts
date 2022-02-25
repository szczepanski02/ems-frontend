export interface IPageableList<T> {
  data: Array<T>;
  totalItems: number;
  totalPages: number;
  itemsPerPage: number;
  currentPage: number;
  filterBy: string;
  filterValue: string;
}