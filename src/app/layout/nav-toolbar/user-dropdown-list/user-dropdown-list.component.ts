import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { notificationType } from 'src/app/constants/NotificationType';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
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
  imageToShow: any = null;
  isImgLoading: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationsService: NotificationsService,
    private employeeService: EmployeeService
  ) { }

  @Input() username: string | undefined;

  ngOnInit(): void {
    this.employeeService.getProfileImg().subscribe(response => {
      this.createImage(response);
    }, () => {
      this.displayDefaultImage = true;
    });
  }
  
  handleLogout(): void {
    this.authService.removeSession();
    this.router.navigate(['/login']);
    this.notificationsService.setNotification("You has been logged out", notificationType.WARNING);
  }

  createImage(image: Blob) {
    if (image && image.size > 0) {
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        this.imageToShow = reader.result;
        this.isImgLoading = false;
      }, false);

      reader.readAsDataURL(image);
    } else {
      this.isImgLoading = false;
      this.displayDefaultImage = true;
    }
  }


}
