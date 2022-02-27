import { I_IPRequestWithEmployeeCredentails } from './../../interfaces/I_IPRequestWithEmployeeCredentials';
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

  private api = `${environment.apiUrl}/auth/ips`;

  constructor(private http: HttpClient) { }

  getListOfRequests(): Observable<ISuccessResponse<I_IPRequestWithEmployeeCredentails[]>> {
    return this.http.get<ISuccessResponse<I_IPRequestWithEmployeeCredentails[]>>(`${this.api}/request`);
  }

  acceptRequest(requestId: string): Observable<ISuccessResponse<string>> {
    return this.http.post<ISuccessResponse<string>>(`${this.api}/request/${requestId}`, {});
  }

  removeRequest(requestId: string): Observable<ISuccessResponse<string>> {
    return this.http.delete<ISuccessResponse<string>>(`${this.api}/request/${requestId}`, {});
  }

  getVerifiedRequestsOfAuthorizatedEmployee(employeeId: string): Observable<ISuccessResponse<string[]>> {
    return this.http.get<ISuccessResponse<string[]>>(`${this.api}/verificatedIP/${employeeId}`);
  }

  deleteVerificatedIPOfAuthorizatedEmployee(ip: string): Observable<ISuccessResponse<string>> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: { ip },
    };
    return this.http.delete<ISuccessResponse<string>>(`${this.api}/verificatedIP`, options );
  }

  deleteVerificatedIP(employeeId: string, ip: string): Observable<ISuccessResponse<string>> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: { ip },
    };
    return this.http.delete<ISuccessResponse<string>>(`${this.api}/verificatedIP/${employeeId}`, options );
  }

}