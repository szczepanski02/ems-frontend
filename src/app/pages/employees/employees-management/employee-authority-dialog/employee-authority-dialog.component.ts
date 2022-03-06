import { Authority } from 'src/app/shared/constants/authority';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from './../../../../services/employee/employee.service';
import { ToastMessageService } from './../../../../shared/reusable-components/toast-message/toast-message.service';
import { Subscription } from 'rxjs';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { toastMessageType } from 'src/app/shared/constants/toastMessageType';
import { IEmployee } from 'src/app/interfaces/IEmployee';

@Component({
  selector: 'app-employee-authority-dialog',
  templateUrl: './employee-authority-dialog.component.html',
  styleUrls: ['./employee-authority-dialog.component.scss']
})
export class EmployeeAuthorityDialogComponent implements OnInit, OnDestroy {

  employee?: IEmployee;
  employeeSubscription?: Subscription;
  setAuthoritySubscription?: Subscription;
  selectedAuthorityValue?: Authority;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { username: string },
    private dialogRef: MatDialogRef<EmployeeAuthorityDialogComponent>,
    private toastMessageService: ToastMessageService,
    private employeeService: EmployeeService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if(!this.data.username) {
      this.dialogRef.close();
      this.toastMessageService.setMessage(
        'Authority management',
        'Cannot get employee data, please raport it to IT Support',
        toastMessageType.ERROR,
        5
      )
      return;
    }
    this.getEmployeeByUsername(this.data.username);
  }

  ngOnDestroy(): void {
    this.employeeSubscription?.unsubscribe();
    this.setAuthoritySubscription?.unsubscribe();
  }

  getEmployeeByUsername(username: string): void {
    this.employeeSubscription = this.employeeService.getEmployeeByUsername(username).subscribe(response => {
      this.employee = response.body;
      this.selectedAuthorityValue = response.body.authority;
    });
  }

  handleSave(): void {
    if(this.selectedAuthorityValue && this.employee) {
      
      this.setAuthoritySubscription = this.authService.setAuthority(this.employee._id, this.selectedAuthorityValue).subscribe(response => {
        this.handleResponseSuccess(response.body);
      });
      
    } else {
      return;
    }
  }

  handleResponseSuccess(message: string): void {
    this.toastMessageService.setMessage(
      'Authority management',
      `${this.selectedAuthorityValue} has been setted to ${this.employee?.firstName} ${this.employee?.lastName}`,
      toastMessageType.INFO,
      5
    );
    this.dialogRef.close();
  }

}
