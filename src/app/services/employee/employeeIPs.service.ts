import { IPRequestWithUserParam } from './../../interfaces/IPRequestWithUserParam';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployee } from 'src/app/interfaces/IEmployee';
import { environment } from 'src/environments/environment';
import { ISuccessResponse } from '../../interfaces/ISuccessResponse';

@Injectable({
  providedIn: 'root'
})
export class EmployeeIPsService {

  private apiAuthIps = `${environment.apiUrl}/auth-ips`;
  private apiAuthRequests = `${environment.apiUrl}/auth-requests`;

  constructor(private http: HttpClient) { }

  getListOfRequests(): Observable<ISuccessResponse<IPRequestWithUserParam[]>> {
    return this.http.get<ISuccessResponse<IPRequestWithUserParam[]>>(`${this.apiAuthRequests}`);
  }

  acceptRequest(requestId: string): Observable<ISuccessResponse<string>> {
    return this.http.post<ISuccessResponse<string>>(`${this.apiAuthRequests}/${requestId}`, {});
  }

  removeRequest(requestId: string): Observable<ISuccessResponse<string>> {
    return this.http.delete<ISuccessResponse<string>>(`${this.apiAuthRequests}/${requestId}`, {});
  }

  getVerifiedRequestsOfAuthorizatedEmployee(employeeId: number): Observable<ISuccessResponse<string[]>> {
    return this.http.get<ISuccessResponse<string[]>>(`${this.apiAuthIps}/${employeeId}`);
  }

  deleteVerificatedIP(id: number): Observable<ISuccessResponse<string>> {
    return this.http.delete<ISuccessResponse<string>>(`${this.apiAuthIps}/${id}`);
  }

}