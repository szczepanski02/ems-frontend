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
    path: ':username',
    data: { authorities: [Authority.ROOT] },
    component: EmployeeEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesManagementRoutingModule { }
