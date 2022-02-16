import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IErrorResponse } from '../interfaces/IErrorResponse';
import { ISuccessResponse } from '../interfaces/ISuccessResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api = `${environment.apiUrl}/auth`;

  constructor(private readonly http: HttpClient) {}

  signIn(payload: ISignInPayload) {
    return this.http.post<ITokenResponse>(`${this.api}/signin`, payload).subscribe({
      next: data => {
        this.setSession(data.response.body.token);
      },
      error: exception => {
        this.handleError(exception);
      }
    });
  }

  async isUserAuthenticated() {
    const promise = await this.http.get<any>(`${this.api}/isAuthorizated`).toPromise();
    if(promise.log) {
      return true;
    }
    return false;
  }

  setSession(token: string) {
    localStorage.setItem('access_token', token);
  }

  removeSession() {
    localStorage.removeItem('access_token');
  }

  handleError(resObj: IErrorResponse) {
    console.log(resObj.error.log);
  }

}

interface ISignInPayload {
  username: string;
  password: string;
}

interface ITokenResponse {
  response: { body: { token: string } };
}