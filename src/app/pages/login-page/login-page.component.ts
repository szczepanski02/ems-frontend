import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  usernameValue = '';
  passwordValue = '';
  isFormValid = false;

  constructor(private router: Router, private authService: AuthService) { }

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
    this.authService.signIn({ username: usernameValue, password: passwordValue });
  }

}
