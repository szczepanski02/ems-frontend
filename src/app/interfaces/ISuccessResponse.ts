export interface ISuccessResponse {
  log: string;
  code: string;
}

export interface ISuccessWithDataResponse<T> {
  status: string;
  body: T;
}