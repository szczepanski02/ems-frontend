import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICreateEmployeePayload } from '../interfaces/ICreateEmployeePayload';
import { ISuccessResponse, ISuccessWithDataResponse } from '../interfaces/ISuccessResponse';
import { IUserFromToken } from '../interfaces/IUserFromToken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = `${environment.apiUrl}/auth`;

  private isLoggedIn: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private readonly http: HttpClient, private router: Router) {}

  signIn(payload: ISignInPayload): Observable<ITokenResponse> {
    return this.http.post<ITokenResponse>(`${this.api}/signin`, payload);
  }

  isUserAuthenticated(): Observable<ISuccessWithDataResponse<IUserFromToken>> {
    return this.http.get<ISuccessWithDataResponse<IUserFromToken>>(`${this.api}/isAuthorizated`);
  }

  setIsLoggedIn(state: boolean): void {
    const sub = this.getIsLoggedIn().subscribe(accState => {
      if(accState === state) return;
      else {
        this.isLoggedIn.next(state);
      }
    });
    sub.unsubscribe();
    this.isLoggedIn.next(state);
  }

  getIsLoggedIn(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  setSession(token: string) {
    localStorage.setItem('access_token', token);
  }

  removeSession(): void {
    localStorage.removeItem('access_token');
    this.router.navigate(['login']);
    this.setIsLoggedIn(false);
  }

  createNewEmployee(payload: ICreateEmployeePayload): Observable<ISuccessResponse> {
    return this.http.post<ISuccessResponse>(`${this.api}/signup`, payload);
  }

}

interface ISignInPayload {
  username: string;
  password: string;
}

export interface ITokenResponse {
  body: { token: string };
}