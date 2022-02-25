import { ImageConventerService } from 'src/app/services/image-conventer.service';
import { EmployeeProfileService } from 'src/app/services/employee/employee-profie.service';
import { IEmployeeWithOptionalParams } from 'src/app/interfaces/IEmployeeWithOptionalParams';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-employee-profile-previewer',
  templateUrl: './employee-profile-previewer.component.html',
  styleUrls: ['./employee-profile-previewer.component.scss']
})
export class EmployeeProfilePreviewerComponent implements OnInit, OnDestroy {

  @Input() employee!: IEmployeeWithOptionalParams;
  profileImgSubscription?: Subscription;
  profileImg: any = null;

  constructor(
    private readonly employeeService: EmployeeService,
    private readonly imageConventerService: ImageConventerService
  ) { }

  ngOnInit(): void {
    if(this.employee.id) {
      this.profileImgSubscription = this.employeeService.getEmployeeProfileImage(this.employee.id).subscribe(response => {
        if(response) {
          this.imageConventerService.createImage(response, '../../../../assets/images/default_profile.png')
            .then(img => this.profileImg = img);
        }
        this.profileImg = '../../../../assets/images/default_profile.png';
      });
    } else {
      this.profileImg = '../../../../assets/images/default_profile.png';
    }

    if(!this.employee) {
      this.employee = {
        firstName: 'unknown', lastName: 'unknown', authority: undefined, email: 'unknown', username: 'unknown'
      }
    }

    if(!this.employee.firstName) {
      this.employee.firstName = 'unknown';
    }
    if(!this.employee.lastName) {
      this.employee.lastName = 'unknown';
    }
    if(!this.employee.authority) {
      this.employee.authority = undefined;
    }
    if(!this.employee.email) {
      this.employee.email = 'unknown'
    }
    if(!this.employee.username) {
      this.employee.username = 'unknown'
    }

  }

  ngOnDestroy(): void {
    this.profileImgSubscription?.unsubscribe();
  }

}
