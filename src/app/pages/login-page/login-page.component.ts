import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { notificationType } from 'src/app/constants/NotificationType';
import { IErrorResponse } from 'src/app/interfaces/IErrorResponse';
import { AuthService, ITokenResponse } from 'src/app/services/auth.service';
import { NotificationsService } from 'src/app/shared/reusable-components/notifications/notifications.service';

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
    private notificationsService: NotificationsService
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
    this.authService.signIn({ username: usernameValue, password: passwordValue }).subscribe({
      next: data => this.authenticationSuccess(data),
      error: res => this.authenticationFailed(res)
    });
  }

  authenticationSuccess(response: ITokenResponse): void {
    this.authService.setSession(response.body.token);
    this.router.navigate(['/']);
    setTimeout(() => {
      this.notificationsService.setNotification('Logged in', notificationType.INFO);
    }, 200);
  }

  authenticationFailed(exception: IErrorResponse): void {
    this.notificationsService.setNotification(exception.error.log, notificationType.ERROR);
    this.usernameValue = '';
    this.passwordValue = '';
    this.isFormValid = false;
  }

}
