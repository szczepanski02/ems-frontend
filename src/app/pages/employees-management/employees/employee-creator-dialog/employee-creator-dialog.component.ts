import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IAuthorizatedEmployee } from 'src/app/interfaces/IAuthorizatedEmployee';
import { ICreateEmployeePayload } from 'src/app/interfaces/ICreateEmployeePayload';
import { IErrorResponse } from 'src/app/interfaces/IErrorResponse';
import { ISuccessResponse } from 'src/app/interfaces/ISuccessResponse';
import { AuthService } from 'src/app/services/auth.service';
import { authorities } from 'src/app/shared/constants/authorities';
import { toastMessageType } from 'src/app/shared/constants/toastMessageType';
import { ToastMessageService } from 'src/app/shared/reusable-components/toast-message/toast-message.service';

@Component({
  selector: 'app-employee-creator-dialog',
  templateUrl: './employee-creator-dialog.component.html',
  styleUrls: ['./employee-creator-dialog.component.scss']
})
export class EmployeeCreatorDialogComponent implements OnInit {

  firstNameValue = '';
  lastNameValue = '';
  usernameValue = '';
  passwordValue = '';
  repeatPasswordValue = '';
  emailValue = '';
  passwordsCompare = false;
  isCreateButtonActive = false;

  employee: IAuthorizatedEmployee = {};
  employeeToPost?: ICreateEmployeePayload;

  constructor(
    private authService: AuthService,
    private toastMessageService: ToastMessageService,
    private dialogRef: MatDialogRef<EmployeeCreatorDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  inputValueChanged(): void {
    this.employee = {
      firstName: this.firstNameValue,
      lastName: this.lastNameValue,
      username: this.usernameValue,
      role: authorities.MODERATOR,
      email: this.emailValue
    }

    this.validate();

  }

  handleCreate(): void {
    if(this.employeeToPost && this.isCreateButtonActive) {
      this.authService.createNewEmployee(this.employeeToPost).subscribe({
        next: (response: ISuccessResponse) => this.handleSuccessResponse(response.log),
        error: (error: IErrorResponse) => this.handleErrorResponse(error.error.log)
      });
    }
  }

  handleSuccessResponse(successMessage: string): void {
    this.toastMessageService.setMessage('Employee management', successMessage, toastMessageType.INFO, 5);
    this.dialogRef.close();
  }

  handleErrorResponse(errorMessage: string): void {
    this.toastMessageService.setMessage('Employee management', errorMessage, toastMessageType.ERROR, 5);
  }

  validate(): void {
    let state = true;
    if(this.firstNameValue.length < 3 && this.lastNameValue.length < 3) {
      state = false;
    }
    if(this.usernameValue.length < 5) {
      state = false;
    }
    if(this.passwordValue.length < 5 || this.passwordValue !== this.repeatPasswordValue) {
      state = false;
    }
    if(this.passwordValue === this.repeatPasswordValue) {
      this.passwordsCompare = true
    }
    if(this.emailValue.length < 6) {
      state = false;
    }
    if(!state) {
      this.isCreateButtonActive = false;
      return;
    }
    this.isCreateButtonActive = true;

    this.employeeToPost = {
      firstName: this.firstNameValue,
      lastName: this.lastNameValue,
      username: this.usernameValue,
      email: this.emailValue,
      password: this.passwordValue
    }

  }

}
