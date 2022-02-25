import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISuccessResponse } from '../interfaces/ISuccessResponse';
import { IUserFromToken } from '../interfaces/IUserFromToken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = `${environment.apiUrl}/auth`;

  private isLoggedIn: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private readonly http: HttpClient, private router: Router) {}

  signIn(payload: ISignInPayload): Observable<ISuccessResponse<ITokenResponse>> {
    return this.http.post<ISuccessResponse<ITokenResponse>>(`${this.api}/signin`, payload);
  }

  isUserAuthenticated(): Observable<ISuccessResponse<IUserFromToken>> {
    return this.http.get<ISuccessResponse<IUserFromToken>>(`${this.api}/authorize`);
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

}

interface ISignInPayload {
  username: string;
  password: string;
}

export interface ITokenResponse {
  access_token: string;
}