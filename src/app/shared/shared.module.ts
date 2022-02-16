import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './reusable-components/notifications/notifications.component';
import { MaterialModule } from '../ng-material.module';



@NgModule({
  declarations: [
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    NotificationsComponent,
    MaterialModule
  ]
})
export class SharedModule { }
