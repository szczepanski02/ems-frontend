import { EmployeesIpsRequestsComponent } from './employees-ips-requests/employees-ips-requests.component';
import { EmployeesManagementComponent } from './employees-management.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Authority } from 'src/app/shared/constants/authority';

const routes: Routes = [
  {
    path: '',
    component: EmployeesManagementComponent
  },
  {
    path: 'edit/:username',
    data: { authorities: [Authority.ROOT] },
    component: EmployeeEditComponent
  },
  {
    path: 'ip_requests',
    data: { authorities: [Authority.ROOT] },
    component: EmployeesIpsRequestsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesManagementRoutingModule { }
