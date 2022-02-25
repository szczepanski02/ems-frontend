import { Authority } from './shared/constants/authority';
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
    data: { authorities: [Authority.MODERATOR, Authority.ADMIN, Authority.ROOT] },
    canActivate: [AuthGuard]
  },
  {
    path: 'employees_management',
    loadChildren: () => import('./pages/employees-management/employee-management.module').then(m => m.EmployeeManagementModule),
    data: { authorities: [Authority.MODERATOR, Authority.ADMIN, Authority.ROOT] },
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: "reload"})],
  exports: [RouterModule],
  providers: [AuthGuard, NonAuthorizatedGuard]
})
export class AppRoutingModule { }
