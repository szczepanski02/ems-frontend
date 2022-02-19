import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEmployee } from '../interfaces/IEmployee';
import { ISuccessWithDataResponse } from '../interfaces/ISuccessResponse';

@Injectable({
  providedIn: 'root'
})
export class EmployeesManagementService {

  private api = `${environment.apiUrl}/employee/`;

  constructor(private http: HttpClient) { }

  getEmployee(id: string | undefined): Observable<ISuccessWithDataResponse<IEmployee>> {
    return this.http.get<ISuccessWithDataResponse<IEmployee>>(`${this.api}/${id}`);
  }

}
