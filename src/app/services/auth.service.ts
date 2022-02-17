import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISuccessWithDataResponse } from '../interfaces/ISuccessResponse';
import { IUserFromToken } from '../interfaces/IUserFromToken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = `${environment.apiUrl}/auth`;

  private isLoggedIn: Subject<boolean> = new BehaviorSubject<boolean>(false);
  private username?: string;
  private role?: string;

  constructor(
    private readonly http: HttpClient
  ) {}

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

  signIn(payload: ISignInPayload): Observable<ITokenResponse> {
    return this.http.post<ITokenResponse>(`${this.api}/signin`, payload);
  }

  isUserAuthenticated(): Observable<ISuccessWithDataResponse<IUserFromToken>> {
    return this.http.get<any>(`${this.api}/isAuthorizated`);
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

  removeSession() {
    localStorage.removeItem('access_token');
    this.setIsLoggedIn(false);
  }
}

interface ISignInPayload {
  username: string;
  password: string;
}

export interface ITokenResponse {
  body: { token: string };
}