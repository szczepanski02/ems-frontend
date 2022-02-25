import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ToastMessageService } from 'src/app/shared/reusable-components/toast-message/toast-message.service';
import { toastMessageType } from 'src/app/shared/constants/toastMessageType';
import { EmployeeProfileService } from 'src/app/services/employee/employee-profie.service';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.scss']
})
export class ProfileImageComponent implements OnDestroy {

  file?: File;
  fileSenderButtonIsActive = false;
  uploadSubscription?: Subscription;

  constructor(
    private toastMessageService: ToastMessageService,
    private employeeProfileService: EmployeeProfileService,
    private authService: AuthService
  ) { }

  ngOnDestroy(): void {
    this.uploadSubscription?.unsubscribe();
  }

  onChange(event: any): void {
    this.file = event.target.files[0];
    if(!this.file) {
      this.fileSenderButtonIsActive = false;
      return;
    }
    if(this.file.size > 1000000) {
      this.fileSenderButtonIsActive = false;
      this.toastMessageService.setMessage('File upload', 'Max file size is 1 MB', toastMessageType.ERROR, 5);
    } else {
      this.fileSenderButtonIsActive = true;
    }
  }

  beforeUploadAntyErrorValidator(): void {
    this.authService.isUserAuthenticated().subscribe(
      () => this.onUpload(),
      () => this.authService.removeSession()
    )
  }

  onUpload(): void {
    if(!this.file) {
      this.fileSenderButtonIsActive = false;
      return;
    }
    this.uploadSubscription = this.employeeProfileService.uploadProfileImg(this.file).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          this.fileSenderButtonIsActive = false;
          break;
        case HttpEventType.Response:
          this.fileSenderButtonIsActive = true;
          window.location.reload();
      }
    });
  }

}
