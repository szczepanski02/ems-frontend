import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreateEmployeePayload } from 'src/app/interfaces/ICreateEmployeePayload';
import { IEmployee } from 'src/app/interfaces/IEmployee';
import { IPageableList } from 'src/app/interfaces/IResPageableList';
import { ITableEmployee } from 'src/app/interfaces/ITableEmployee';
import { environment } from 'src/environments/environment';
import { ISuccessResponse } from '../../interfaces/ISuccessResponse';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private api = `${environment.apiUrl}/employee`;

  constructor(private http: HttpClient) { }

  createNewEmployee(payload: ICreateEmployeePayload): Observable<ISuccessResponse<string>> {
    return this.http.post<ISuccessResponse<string>>(`${this.api}/create`, payload);
  }

  getEmployee(id: string | undefined): Observable<ISuccessResponse<IEmployee>> {
    return this.http.get<ISuccessResponse<IEmployee>>(`${this.api}/${id}`);
  }

  getAllEmployees(page: number, limit: number, filterBy: string, filterValue: string): Observable<ISuccessResponse<IPageableList<ITableEmployee>>> {
    if(filterBy && filterValue) {
      if(filterBy === 'authority') {
        filterValue = `${filterValue}`;
      }
      return this.http.get<ISuccessResponse<IPageableList<ITableEmployee>>>(
        `${this.api}?page=${page}&limit=${limit}&filterBy=${filterBy}&filterValue=${filterValue}`
      );
    }
    return this.http.get<ISuccessResponse<IPageableList<ITableEmployee>>>(`${this.api}?page=${page}&limit=${limit}`);
  }

}