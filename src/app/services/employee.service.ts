import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private api = environment.apiUrl;

  private id?: string;
  private username?: string;
  private role?: string;

  constructor(private http: HttpClient) { }
  
  setId(state: string): void {
    this.id = state;
  }

  getId(): string | undefined {
    return this.id;
  }

  setUsername(state: string): void {
    this.username = state;
  }

  getUsername(): string | undefined {
    return this.username;
  }

  setRole(state: string): void {
    this.role = state;
  }

  getRole(): string | undefined {
    return this.role;
  }

  getProfileImg(): Observable<any> {
    return this.http.get(`https://ems-backend-heroku.herokuapp.com/api/employee_profile_img`, { responseType: 'blob' });
  }

  uploadProfileImg(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.post(`${this.api}/employee_profile_img`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

}
