import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeManagementRoutingModule } from './employee-management-routing.module';
import { EmployeesComponent } from './employees/employees.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfilePasswordChangerComponent } from './profile/profile-password-changer/profile-password-changer.component';
import { ProfileIpsDetailsComponent } from './profile/profile-ips-details/profile-ips-details.component';
import { ProfileImageComponent } from './profile/profile-image/profile-image.component';
import { EmployeeCreatorDialogComponent } from './employees/employee-creator-dialog/employee-creator-dialog.component';


@NgModule({
  declarations: [
    EmployeesComponent,
    ProfileComponent,
    ProfileIpsDetailsComponent,
    ProfilePasswordChangerComponent,
    ProfileIpsDetailsComponent,
    ProfileImageComponent,
    EmployeeCreatorDialogComponent
  ],
  imports: [
    CommonModule,
    EmployeeManagementRoutingModule,
    SharedModule
  ]
})
export class EmployeeManagementModule { }
