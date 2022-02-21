import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../ng-material.module';
import { RemoveRolePrefixPipe } from './pipes/RemoveRolePrefix';
import { ToastMessageComponent } from './reusable-components/toast-message/toast-message.component';
import { DebounceClickDirective } from './helpers/debounce-click.directive';
import { ShowIfBetweenWidthDirective } from './helpers/show-if-between-width.directive';
import { EmployeeProfilePreviewerComponent } from './reusable-components/employee-profile-previewer/employee-profile-previewer.component';



@NgModule({
  declarations: [
    RemoveRolePrefixPipe,
    ToastMessageComponent,
    DebounceClickDirective,
    ShowIfBetweenWidthDirective,
    EmployeeProfilePreviewerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    RemoveRolePrefixPipe,
    ToastMessageComponent,
    DebounceClickDirective,
    ShowIfBetweenWidthDirective,
    EmployeeProfilePreviewerComponent
  ]
})
export class SharedModule { }
