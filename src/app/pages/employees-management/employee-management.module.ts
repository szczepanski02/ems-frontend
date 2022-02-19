import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeManagementRoutingModule } from './employee-management-routing.module';
import { EmployeesComponent } from './employees/employees.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { IpVerificatedDetailsComponent } from './profile/ip-verificated-details/ip-verificated-details.component';


@NgModule({
  declarations: [
    EmployeesComponent,
    ProfileComponent,
    IpVerificatedDetailsComponent
  ],
  imports: [
    CommonModule,
    EmployeeManagementRoutingModule,
    SharedModule
  ]
})
export class EmployeeManagementModule { }
