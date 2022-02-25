import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IEmployee } from 'src/app/interfaces/IEmployee';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeProfileService } from 'src/app/services/employee/employee-profie.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { ImageConventerService } from 'src/app/services/image-conventer.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  profileImgSubscription?: Subscription;
  profileImg: any = null;
  employeeSubscription?: Subscription;
  employeeData?: IEmployee;
  dataLoaded = false;

  constructor(
    private employeeService: EmployeeService,
    private employeeProfileService: EmployeeProfileService,
    private authService: AuthService,
    private imageConventerService: ImageConventerService,
  ) {}

  ngOnInit(): void {
    this.profileImgSubscription = this.employeeProfileService.getUserProfileImg().subscribe(response => {
      if(response) {
        this.imageConventerService.createImage(response, '../../../../assets/images/default_profile.png')
          .then(img => this.profileImg = img);
      }
      this.profileImg = '../../../../assets/images/default_profile.png';
    });
    const emplId = this.employeeProfileService.getId();
    if(emplId) {
      this.employeeSubscription = this.employeeService.getEmployee(emplId).subscribe({
        next: response => {
          this.dataLoaded = true;
          this.employeeData = response.body;
        },
        error: () => {
          this.authService.removeSession();
          this.dataLoaded = false;
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.profileImgSubscription?.unsubscribe();
    this.employeeSubscription?.unsubscribe();
  }


}