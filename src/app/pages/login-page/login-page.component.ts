import { ISuccessResponse } from 'src/app/interfaces/ISuccessResponse';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, ITokenResponse } from 'src/app/services/auth.service';
import { ToastMessageService } from 'src/app/shared/reusable-components/toast-message/toast-message.service';
import { toastMessageType } from 'src/app/shared/constants/toastMessageType';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  usernameValue = '';
  passwordValue = '';
  isFormValid = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastMessageService: ToastMessageService
  ) { }

  ngOnInit(): void {
  }

  inputValueChanged(): boolean {
    if(this.usernameValue.length >= 5 && this.passwordValue.length >= 5) {
      return this.isFormValid = true;
    }
    return this.isFormValid = false;
  }

  signIn(): void {
    const { usernameValue, passwordValue } = this;
    this.authService.signIn({ username: usernameValue, password: passwordValue }).subscribe(
      data => this.authenticationSuccess(data)
    ); // error is catching in HttpUnauthorizatedInterceptor
  }

  authenticationSuccess(response: ISuccessResponse<ITokenResponse>): void {
    this.authService.setSession(response.body.access_token);
    this.router.navigate(['/']);
    setTimeout(() => {
      this.toastMessageService.setMessage('Authorization', 'Logged in', toastMessageType.INFO, 5);
    }, 200);
  }

}
