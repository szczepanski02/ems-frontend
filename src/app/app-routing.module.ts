import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedOutAuthGuard } from './guards/auth-logged-out.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [LoggedOutAuthGuard],
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
  providers: [AuthGuard, LoggedOutAuthGuard]
})
export class AppRoutingModule { }
