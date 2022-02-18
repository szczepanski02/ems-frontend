import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { notificationType } from 'src/app/constants/NotificationType';
import { IErrorResponse } from 'src/app/interfaces/IErrorResponse';
import { EmployeeService } from 'src/app/services/employee.service';
import { NotificationsService } from 'src/app/shared/reusable-components/notifications/notifications.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  shortLink: string = ""; // Flag variable
  file?: File;
  fileSenderButtonIsActive = false;

  constructor(
    private employeeService: EmployeeService,
    private notificationsService: NotificationsService,
  ) {}

  ngOnInit(): void {
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

  onUpload() {
    if(!this.file) {
      this.fileSenderButtonIsActive = false;
      return;
    }
    this.employeeService.uploadProfileImg(this.file).subscribe((event: HttpEvent<any>) => {
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
    this.notificationsService.setNotification(result, notificationType.INFO);
  }

  handleUploadError(result: IErrorResponse): void {
    this.notificationsService.setNotification(result.error.log, notificationType.ERROR);
  }

}
