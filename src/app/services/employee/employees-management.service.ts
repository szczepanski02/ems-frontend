import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResPageableList } from 'src/app/interfaces/IResPageableList';
import { ITableEmployee } from 'src/app/interfaces/ITableEmployee';
import { environment } from 'src/environments/environment';
import { IEmployee } from '../../interfaces/IEmployee';
import { ISuccessWithDataResponse } from '../../interfaces/ISuccessResponse';

@Injectable({
  providedIn: 'root'
})
export class EmployeesManagementService {

  private api = `${environment.apiUrl}/employee`;

  constructor(private http: HttpClient) { }

  getEmployee(id: string | undefined): Observable<ISuccessWithDataResponse<IEmployee>> {
    return this.http.get<ISuccessWithDataResponse<IEmployee>>(`${this.api}/${id}`);
  }

  getAllEmployees(page: number, limit: number, filterBy: string, filterValue: string): Observable<IResPageableList<ITableEmployee>> {
    if(filterBy && filterValue) {
      if(filterBy === 'role') {
        filterValue = `ROLE_${filterValue}`;
      }
      return this.http.get<IResPageableList<ITableEmployee>>(
        `${this.api}?page=${page}&limit=${limit}&filterBy=${filterBy}&filterValue=${filterValue}`
      );
    }
    return this.http.get<IResPageableList<ITableEmployee>>(`${this.api}?page=${page}&limit=${limit}`);
  }

}