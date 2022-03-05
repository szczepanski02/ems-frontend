import { Authority } from './shared/constants/authority';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NonAuthorizatedGuard } from './guards/non-authorizated.guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [NonAuthorizatedGuard],
    pathMatch: 'full',
    loadChildren: () => import('./pages/login-page/login-page.module').then(m => m.LoginPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/global-management/global-management.module').then(m => m.GlobalManagementModule),
    data: { authorities: [Authority.MODERATOR, Authority.ADMIN, Authority.ROOT] },
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'employees',
    loadChildren: () => import('./pages/employees/employee.module').then(m => m.EmployeeModule),
    data: { authorities: [Authority.MODERATOR, Authority.ADMIN, Authority.ROOT] },
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: "reload" })],
  exports: [RouterModule],
  providers: [AuthGuard, NonAuthorizatedGuard]
})
export class AppRoutingModule { }
