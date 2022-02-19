import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { notificationType } from 'src/app/constants/NotificationType';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ImageConventerService } from 'src/app/services/image-conventer.service';
import { NotificationsService } from 'src/app/shared/reusable-components/notifications/notifications.service';

@Component({
  selector: 'app-user-dropdown-list',
  templateUrl: './user-dropdown-list.component.html',
  styleUrls: ['./user-dropdown-list.component.scss']
})
export class UserDropdownListComponent implements OnInit {

  displayDefaultImage = false;

  changeImage: boolean = false;
  uploading: boolean = false;
  profileImg: any = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationsService: NotificationsService,
    private employeeService: EmployeeService,
    private imageConventerService: ImageConventerService,
  ) { }

  @Input() firstName: string | undefined;
  @Input() lastName: string | undefined;

  ngOnInit(): void {
    this.employeeService.getUserProfileImg().subscribe(response => {
      if(response) {
        this.imageConventerService.createImage(response, '../../../../assets/images/default_profile.png')
          .then(img => this.profileImg = img);
      }
      this.profileImg = '../../../../assets/images/default_profile.png';
    });
  }
  
  handleLogout(): void {
    this.authService.removeSession();
    this.router.navigate(['/login']);
    this.notificationsService.setNotification("You has been logged out", notificationType.WARNING);
  }
}
