import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IAuthorizatedEmployee } from "src/app/interfaces/IAuthorizatedEmployee";
import { ISuccessResponse } from 'src/app/interfaces/ISuccessResponse';
import { Authority } from "src/app/shared/constants/authority";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeProfileService {

  private api = `${environment.apiUrl}/employee-profile`;
  private authorizatedEmployee: IAuthorizatedEmployee = {};

  constructor(private readonly http: HttpClient) {}

  setId(state: string): void {
    this.authorizatedEmployee.id = state;
  }

  getId(): string | undefined {
    return this.authorizatedEmployee.id;
  }

  setUsername(state: string): void {
    this.authorizatedEmployee.username = state;
  }

  getUsername(): string | undefined {
    return this.authorizatedEmployee.username;
  }

  setAuthority(state: Authority): void {
    this.authorizatedEmployee.authority = state;
  }

  getAuthority(): string | undefined {
    return this.authorizatedEmployee.authority;
  }

  setFirstname(state: string): void {
    this.authorizatedEmployee.firstName = state;
  }

  getFirstname(): string | undefined {
    return this.authorizatedEmployee.firstName;
  }

  setLastname(state: string): void {
    this.authorizatedEmployee.lastName = state;
  }

  getLastname(): string | undefined {
    return this.authorizatedEmployee.lastName;
  }

  getUserProfileImg(): Observable<Blob | null> {
    return this.http.get(`${this.api}/avatar`, { responseType: 'blob' });
  }

  uploadProfileImg(file: File): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('avatar', file);

    return this.http.post(`${this.api}/avatar`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
  
  changeEmployeePassword(payload: IPasswordChangePayload): Observable<ISuccessResponse<string>> {
    return this.http.put<any>(`${this.api}/change-password`, payload);
  }

}

interface IPasswordChangePayload {
  password: string;
  newPassword: string;
}