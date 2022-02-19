import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { IAuthorizatedEmployee } from '../interfaces/IAuthorizatedEmployee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private api = environment.apiUrl;

  private userProfileImage: Subject<Blob | null> = new Subject<Blob | null>();

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

  setRole(state: string): void {
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
    return this.userProfileImage;
  }

  setUserProfileImage(): void  {
    this.http.get(`${this.api}/employee_profile_img`, { responseType: 'blob' }).subscribe(
      response => {
        this.userProfileImage.next(response);
      }
    )
  }

  uploadProfileImg(file: File): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.post(`${this.api}/employee_profile_img`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

}
