import { EmployeesIpsRequestsComponent } from './employees-ips-requests/employees-ips-requests.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeCreatorDialogComponent } from './employee-creator-dialog/employee-creator-dialog.component';
import { EmployeesManagementComponent } from './employees-management.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesManagementRoutingModule } from './employees-management-routing.module';



@NgModule({
  declarations: [EmployeesManagementComponent, EmployeeCreatorDialogComponent, EmployeeEditComponent, EmployeesIpsRequestsComponent],
  imports: [
    CommonModule,
    EmployeesManagementRoutingModule,
    SharedModule
  ]
})
export class EmployeesManagementModule { }
