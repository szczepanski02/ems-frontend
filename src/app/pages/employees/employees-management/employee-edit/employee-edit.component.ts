import { ConfirmationDialogComponent } from './../../../../shared/reusable-components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastMessageService } from 'src/app/shared/reusable-components/toast-message/toast-message.service';
import { ISuccessResponse } from 'src/app/interfaces/ISuccessResponse';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { IEmployee } from 'src/app/interfaces/IEmployee';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Authority } from 'src/app/shared/constants/authority';
import { IEmployeeWithOptionalParams } from 'src/app/interfaces/IEmployeeWithOptionalParams';
import { toastMessageType } from 'src/app/shared/constants/toastMessageType';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit, OnDestroy {

  private username?: string | null;
  private employee?: IEmployee;
  modifiedEmployee?: IEmployeeWithOptionalParams;
  
  usernameValue = '';
  firstNameValue = '';
  lastNameValue = '';
  emailValue = '';
  isActive = false;
  isButtonActive = false;
  ipVerification = false;

  getEmployeeSubscription?: Subscription;
  saveEmployeeSubscription?: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly employeeService: EmployeeService,
    private readonly router: Router,
    private readonly toastMessageService: ToastMessageService,
    private dialog: MatDialog
  ) {}
  
  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username');
    if(this.username) {
      this.getEmployeeSubscription = this.employeeService.getEmployeeByUsername(this.username)
        .subscribe({
          next: response => this.handleEmployeeData(response),
          complete: () => {
            if(!this.employee) {
              this.router.navigate(['/employees/management']);
            }
          }
        });
    } else {
      this.router.navigate(['/employees/management']);
    }
  }

  ngOnDestroy(): void {
    this.getEmployeeSubscription?.unsubscribe();
    this.saveEmployeeSubscription?.unsubscribe();
  }

  handleEmployeeData(response: ISuccessResponse<IEmployee>) {
    this.employee = response.body;
    this.modifiedEmployee = response.body;
    this.modifiedEmployee.id = response.body._id;
    this.usernameValue = response.body.username;
    this.firstNameValue = response.body.firstName;
    this.lastNameValue = response.body.lastName;
    this.emailValue = response.body.email;
    this.isActive = response.body.isActive;
    this.ipVerification = response.body.ipVerification;
  }

  employeeProfilePropertyChanged(): void {
    this.modifiedEmployee = {
      username: this.usernameValue,
      firstName: this.firstNameValue,
      lastName: this.lastNameValue,
      email: this.emailValue,
      authority: this.employee ? this.employee.authority : Authority.MODERATOR,
      createdAt: this.employee?.createdAt,
      createdBy: this.employee?.createdBy,
      isActive: this.isActive,
      id: this.employee?._id,
      ipVerification: this.ipVerification
    }
    if(this.usernameValue.length > 5 && this.firstNameValue.length > 2 && this.lastNameValue.length > 2 && this.emailValue.length > 6) {
      this.isButtonActive = true;
    }
  }

  handleResetValues(): void {
    if(this.employee) {
      this.usernameValue = this.employee.username;
      this.firstNameValue = this.employee.firstName;
      this.lastNameValue = this.employee.lastName;
      this.emailValue = this.employee.email;
    }
  }

  saveChanges(): void {
    console.log(this.modifiedEmployee);
    if(!this.modifiedEmployee) {
      return;
    }
    this.saveEmployeeSubscription = this.employeeService.updateEmployee(this.modifiedEmployee).subscribe(response => {
      this.toastMessageService.setMessage('Employee management', response.body, toastMessageType.INFO, 5);
    });
  }

  handleDelete(): void {
    const result = this.openConfirmDeleteDialog();
  }

  openConfirmDeleteDialog(): boolean | void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Employee remove confirmation',
        content: `Are you sure to remove employee ${ this.employee?.firstName } ${ this.employee?.lastName }?`
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        if(!this.modifiedEmployee || !this.modifiedEmployee._id) {
          return this.toastMessageService.setMessage('Employee management', 'Some problem with server, please reload page', toastMessageType.WARN, 5);
        }
        this.employeeService.deleteEmployee(this.modifiedEmployee._id).subscribe(result => {
          this.toastMessageService.setMessage('Employee management', result.body, toastMessageType.INFO, 5);
          this.router.navigate(['/employees/management']);
        });
      } else {
        this.toastMessageService.setMessage('Employee management', 'Deletion canceled', toastMessageType.WARN, 5);
      }
    });
  }

}
