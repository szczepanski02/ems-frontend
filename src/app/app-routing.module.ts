import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoggedOutAuthGuard } from './guards/auth-logged-out.guard';
import { AuthGuard } from './guards/auth.guard';
import { SidenavComponent } from './layout/sidenav/sidenav.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, LoggedOutAuthGuard]
})
export class AppRoutingModule { }
