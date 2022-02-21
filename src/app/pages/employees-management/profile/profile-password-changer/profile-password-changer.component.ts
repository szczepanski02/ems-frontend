import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { ToastMessageService } from 'src/app/shared/reusable-components/toast-message/toast-message.service';
import { toastMessageType } from 'src/app/shared/constants/toastMessageType';

@Component({
  selector: 'app-profile-password-changer',
  templateUrl: './profile-password-changer.component.html',
  styleUrls: ['./profile-password-changer.component.scss']
})
export class ProfilePasswordChangerComponent implements OnInit, OnDestroy {

  passwordChangerBtnIsActive = false;
  employeePasswordChangeSubscription?: Subscription;

  passwordValue = '';
  newPasswordValue = '';
  newPasswordRepeatValue = '';

  constructor(
    private employeeService: EmployeeService,
    private toastMessageService: ToastMessageService
    ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.employeePasswordChangeSubscription?.unsubscribe();
  }

  passwordInputChanged(): void {
    if(this.passwordValue.length >= 5 && this.newPasswordValue.length >= 5 && this.newPasswordRepeatValue === this.newPasswordValue) {
      this.passwordChangerBtnIsActive = true;
    } else {
      this.passwordChangerBtnIsActive = false;
    }
  }

  handleEmployeePasswordChanger(): void {
    this.employeePasswordChangeSubscription = this.employeeService.changeEmployeePassword({
      password: this.passwordValue,
      newPassword: this.newPasswordValue,
      newPasswordRepeat: this.newPasswordRepeatValue,
    }).subscribe(response => {
        this.toastMessageService.setMessage('Password change', response.log, toastMessageType.INFO, 5);
        this.passwordValue = '';
        this.newPasswordValue = '';
        this.newPasswordRepeatValue = '';
      }
    );
  }

}
