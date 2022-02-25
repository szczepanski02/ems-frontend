import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { ImageConventerService } from 'src/app/services/image-conventer.service';
import { ToastMessageService } from 'src/app/shared/reusable-components/toast-message/toast-message.service';
import { toastMessageType } from 'src/app/shared/constants/toastMessageType';
import { EmployeeProfileService } from 'src/app/services/employee/employee-profie.service';

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
    private toastMessageService: ToastMessageService,
    private employeeProfileService: EmployeeProfileService,
    private imageConventerService: ImageConventerService,
  ) { }

  @Input() firstName: string | undefined;
  @Input() lastName: string | undefined;

  ngOnInit(): void {
    this.employeeProfileService.getUserProfileImg().subscribe(response => {
      if(response) {
        this.imageConventerService.createImage(response, '../../../../assets/images/default_profile.png')
          .then(img => this.profileImg = img);
      }
      this.profileImg = '../../../../assets/images/default_profile.png';
    });
  }
  
  handleLogout(): void {
    this.authService.removeSession();
    this.toastMessageService.setMessage('Authorization', 'You has been logged out', toastMessageType.WARN, 5);
  }
}
