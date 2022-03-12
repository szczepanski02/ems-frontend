import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastMessageService } from 'src/app/shared/reusable-components/toast-message/toast-message.service';
import { toastMessageType } from 'src/app/shared/constants/toastMessageType';
import { EmployeeProfileService } from 'src/app/services/employee/employee-profie.service';

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
    private employeeProfileService: EmployeeProfileService,
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
    const id = this.employeeProfileService.getId();
    if(!id) return;
    this.employeePasswordChangeSubscription = this.employeeProfileService.changeEmployeePassword({
      password: this.passwordValue,
      newPassword: this.newPasswordValue
    }, id).subscribe(response => {
        this.toastMessageService.setMessage('Password change', response.body, toastMessageType.INFO, 5);
        this.passwordValue = '';
        this.newPasswordValue = '';
        this.newPasswordRepeatValue = '';
      }
    );
  }

}
