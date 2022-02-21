export interface IPageableList<T> {
  data: Array<T>;
  totalItems: number;
  totalPages: number;
  itemsPerPage: number;
  currentPage: number;
  filterBy: string;
  filterValue: string;
}

export interface IResPageableList<T> {
  status: number;
  responseObject: IPageableList<T>;
}