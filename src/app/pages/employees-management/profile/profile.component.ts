import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { notificationType } from 'src/app/constants/NotificationType';
import { IEmployee } from 'src/app/interfaces/IEmployee';
import { IErrorResponse } from 'src/app/interfaces/IErrorResponse';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeesManagementService } from 'src/app/services/employees-management.service';
import { ImageConventerService } from 'src/app/services/image-conventer.service';
import { NotificationsService } from 'src/app/shared/reusable-components/notifications/notifications.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  file?: File;
  fileSenderButtonIsActive = false;
  uploadSubscription?: Subscription;
  profileImgSubscription?: Subscription;
  profileImg: any = null;
  employeeSubscription?: Subscription;
  employeeData?: IEmployee;
  dataLoaded = false;
  passwordChangerBtnIsActive = false;

  constructor(
    private employeeService: EmployeeService,
    private employeesManagementService: EmployeesManagementService,
    private notificationsService: NotificationsService,
    private authService: AuthService,
    private router: Router,
    private imageConventerService: ImageConventerService,
  ) {}

  ngOnInit(): void {
    this.profileImgSubscription = this.employeeService.getUserProfileImg().subscribe(response => {
      if(response) {
        this.imageConventerService.createImage(response, '../../../../assets/images/default_profile.png')
          .then(img => this.profileImg = img);
      }
      this.profileImg = '../../../../assets/images/default_profile.png';
    });

    const emplId = this.employeeService.getId();
    if(emplId) {
      this.employeeSubscription = this.employeesManagementService.getEmployee(this.employeeService.getId()).subscribe(
        response => {
          this.dataLoaded = true;
          this.employeeData = response.body;
        },
        () => {
          this.authService.removeSession();
          this.router.navigate(['/login']);
          this.dataLoaded = false;
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.uploadSubscription?.unsubscribe();
    this.profileImgSubscription?.unsubscribe();
    this.employeeSubscription?.unsubscribe();
  }

  onChange(event: any): void {
    this.file = event.target.files[0];
    if(!this.file) {
      this.fileSenderButtonIsActive = false;
      return;
    }
    if(this.file.size > 1000000) {
      this.fileSenderButtonIsActive = false;
      this.notificationsService.setNotification('Max file size is 1 MB', notificationType.ERROR);
    } else {
      this.fileSenderButtonIsActive = true;
    }
  }

  beforeUploadAntyErrorValidator(): void {
    this.authService.isUserAuthenticated().subscribe(
      () => this.onUpload(),
      () => this.router.navigate(['/login'])
    )
  }

  onUpload(): void {
    if(!this.file) {
      this.fileSenderButtonIsActive = false;
      return;
    }
    this.uploadSubscription = this.employeeService.uploadProfileImg(this.file).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          this.fileSenderButtonIsActive = false;
          break;
        case HttpEventType.Response:
          this.handleUploadSuccess('Profile image has been setted!');
          this.fileSenderButtonIsActive = true;
      }
    }, (error) => {
      this.handleUploadError(error);
    });
  }

  handleUploadSuccess(result: string): void {
    this.employeeService.setUserProfileImage();
    this.notificationsService.setNotification(result, notificationType.INFO);
  }

  handleUploadError(result: IErrorResponse): void {
    this.notificationsService.setNotification(result.error.log, notificationType.ERROR);
  }

}
