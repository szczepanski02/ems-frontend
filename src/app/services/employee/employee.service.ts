import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { authorities } from 'src/app/shared/constants/authorities';
import { environment } from 'src/environments/environment.prod';
import { IAuthorizatedEmployee } from '../../interfaces/IAuthorizatedEmployee';
import { ISuccessResponse } from '../../interfaces/ISuccessResponse';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private api = `${environment.apiUrl}/employee`;

  private authorizatedEmployee: IAuthorizatedEmployee = {};

  constructor(private http: HttpClient) { }
  
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

  setRole(state: authorities): void {
    this.authorizatedEmployee.role = state;
  }

  getRole(): string | undefined {
    return this.authorizatedEmployee.role;
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
    return this.http.get(`${this.api}_profile_img`, { responseType: 'blob' });
  }

  uploadProfileImg(file: File): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.post(`${this.api}_profile_img`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  changeEmployeePassword(payload: IPasswordChangePayload): Observable<ISuccessResponse> {
    return this.http.post<ISuccessResponse>(`${this.api}_profile/change_password`, payload);
  }

}


interface IPasswordChangePayload {
  password: string;
  newPassword: string;
  newPasswordRepeat: string;
}