import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NonAuthorizatedGuard } from './guards/non-authorizated.guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [NonAuthorizatedGuard],
    loadChildren: () => import('./pages/login-page/login-page.module').then(m => m.LoginPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/global-management/global-management.module').then(m => m.GlobalManagementModule),
    data: { authorities: ['ROLE_MODERATOR', 'ROLE_ADMIN', 'ROLE_ROOT'] },
    canActivate: [AuthGuard]
  },
  {
    path: 'employees_management',
    loadChildren: () => import('./pages/employees-management/employee-management.module').then(m => m.EmployeeManagementModule),
    data: { authorities: ['ROLE_MODERATOR', 'ROLE_ADMIN', 'ROLE_ROOT'] },
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: "reload"})],
  exports: [RouterModule],
  providers: [AuthGuard, NonAuthorizatedGuard]
})
export class AppRoutingModule { }
