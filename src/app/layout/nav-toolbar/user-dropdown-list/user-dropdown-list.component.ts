import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { notificationType } from 'src/app/constants/NotificationType';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationsService } from 'src/app/shared/reusable-components/notifications/notifications.service';

@Component({
  selector: 'app-user-dropdown-list',
  templateUrl: './user-dropdown-list.component.html',
  styleUrls: ['./user-dropdown-list.component.scss']
})
export class UserDropdownListComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationsService: NotificationsService
  ) { }

  @Input() username: string | undefined;

  ngOnInit(): void {
  }
  
  handleLogout(): void {
    this.authService.removeSession();
    this.router.navigate(['/login']);
    this.notificationsService.setNotification("You has been logged out", notificationType.WARNING);
  }

}
