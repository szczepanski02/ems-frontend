import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { NotificationsService } from './notifications.service';

@Component({
  selector: 'app-notifications',
  template: ''
})
export class NotificationsComponent implements OnInit, OnDestroy {

  notificationSubscribe?: Subscription;

  constructor(private notificationService: NotificationsService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.notificationSubscribe = this.notificationService.getNotification().subscribe(({ notification, alertType }) => {
      let colorSchema = 'mat-primary';
      if(alertType === 'info') colorSchema = 'mat-primary';
      if(alertType === 'error') colorSchema = 'mat-warn';
      if(alertType === 'warning') colorSchema = 'mat-accent';
      this.snackBar.open(notification, '', {
        duration: 3000,
        panelClass: ['mat-toolbar', colorSchema]
      });
    });
  }

  ngOnDestroy() {
    this.notificationSubscribe?.unsubscribe();
  }

}
