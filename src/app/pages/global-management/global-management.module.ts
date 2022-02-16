import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlobalManagementRoutingModule } from './global-management-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    GlobalManagementRoutingModule,
    SharedModule
  ]
})
export class GlobalManagementModule { }
