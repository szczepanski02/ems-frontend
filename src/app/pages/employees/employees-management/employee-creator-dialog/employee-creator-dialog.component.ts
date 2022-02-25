import { EmployeeService } from 'src/app/services/employee/employee.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IAuthorizatedEmployee } from 'src/app/interfaces/IAuthorizatedEmployee';
import { ICreateEmployeePayload } from 'src/app/interfaces/ICreateEmployeePayload';
import { IErrorResponse } from 'src/app/interfaces/IErrorResponse';
import { ISuccessResponse } from 'src/app/interfaces/ISuccessResponse';
import { Authority } from 'src/app/shared/constants/authority';
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
    private toastMessageService: ToastMessageService,
    private dialogRef: MatDialogRef<EmployeeCreatorDialogComponent>,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
  }

  inputValueChanged(): void {
    this.employee = {
      firstName: this.firstNameValue,
      lastName: this.lastNameValue,
      username: this.usernameValue,
      authority: Authority.MODERATOR,
      email: this.emailValue
    }

    this.validate();

  }

  handleCreate(): void {
    if(this.employeeToPost && this.isCreateButtonActive) {
      this.employeeService.createNewEmployee(this.employeeToPost).subscribe({
        next: (response: ISuccessResponse<string>) => this.handleSuccessResponse(response.body),
        error: (error: IErrorResponse) => this.handleErrorResponse(error.message)
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
